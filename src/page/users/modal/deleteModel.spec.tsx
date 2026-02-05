import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as usersService from "../../../services/users";
import { DeleteModal } from "../modal/deleteModal";
// Mock do serviço
vi.mock("../../../services/users", () => ({
  deleteUser: vi.fn(),
}));

// Mock do axios
vi.mock("axios");

describe("DeleteModal", () => {
  const mockUser = {
    id: "123",
    username: "joao.silva",
    name: "João Silva",
    email: "joao.silva@example.com",
    roles: ["USER"],
    isActive: true,
  };

  const mockSetOpen = vi.fn();
  const mockSetAlert = vi.fn();
  const mockSetDataRefresh = vi.fn();

  const defaultProps = {
    user: mockUser,
    open: true,
    setOpen: mockSetOpen,
    setAlert: mockSetAlert,
    setDataRefresh: mockSetDataRefresh,
    dataRefresh: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar o modal com o nome do usuário", () => {
    render(<DeleteModal {...defaultProps} />);

    expect(screen.getByText(/Deseja deletar o usuário:/i)).toBeInTheDocument();
    expect(screen.getByText("joao.silva")).toBeInTheDocument();
  });

  it("deve exibir os botões Cancelar e Deletar", () => {
    render(<DeleteModal {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: /cancelar/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /deletar/i }),
    ).toBeInTheDocument();
  });

  it("deve fechar o modal ao clicar em Cancelar", async () => {
    const user = userEvent.setup();
    render(<DeleteModal {...defaultProps} />);

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    await user.click(cancelButton);

    expect(mockSetOpen).toHaveBeenCalledWith(false);
    expect(mockSetDataRefresh).toHaveBeenCalledWith(true);
  });

  it("deve deletar o usuário com sucesso", async () => {
    const user = userEvent.setup();
    vi.mocked(usersService.deleteUser).mockResolvedValue({
      status: 200,
    } as any);

    render(<DeleteModal {...defaultProps} />);

    const deleteButton = screen.getByRole("button", { name: /deletar/i });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(usersService.deleteUser).toHaveBeenCalledWith("123");
      expect(mockSetOpen).toHaveBeenCalledWith(false);
      expect(mockSetDataRefresh).toHaveBeenCalledWith(true);
      expect(mockSetAlert).toHaveBeenCalledWith({
        open: true,
        message: "Usuário deletada com sucesso",
        type: "success",
      });
    });
  });

  it("deve exibir erro ao falhar na exclusão", async () => {
    const user = userEvent.setup();
    const errorMessage = "Erro ao deletar usuário";

    const mockError = {
      response: {
        data: { message: errorMessage },
        status: 400,
      },
    };

    // Mock do axios.isAxiosError para retornar true
    vi.mocked(axios.isAxiosError).mockReturnValue(true);
    vi.mocked(usersService.deleteUser).mockRejectedValue(mockError);

    render(<DeleteModal {...defaultProps} />);

    const deleteButton = screen.getByRole("button", { name: /deletar/i });
    await user.click(deleteButton);

    // Debug para ver se o erro está sendo capturado
    await waitFor(() => {
      console.log("deleteUser chamado?", usersService.deleteUser);
      console.log("mockSetAlert calls:", mockSetAlert.mock.calls);
      expect(usersService.deleteUser).toHaveBeenCalled();
    });

    await waitFor(
      () => {
        expect(mockSetAlert).toHaveBeenCalledWith({
          open: true,
          message: errorMessage,
          type: "error",
        });
      },
      { timeout: 3000 },
    );
  });

  it("não deve renderizar quando open é false", () => {
    const { container } = render(
      <DeleteModal {...defaultProps} open={false} />,
    );

    // Dependendo da implementação do DialogContainer
    expect(container.firstChild).toBeNull();
  });
});
