import { render, screen } from "@testing-library/react";
import PlayerHub from "./PlayerHub";
import userEvent from "@testing-library/user-event";

describe("PlayerHub", () => {
  const avatar = "👨‍🦰",
    name = "John",
    messageDuration = 500;

  test("renders PlayerHub", () => {
    render(
      <PlayerHub
        avatar={avatar}
        name={name}
        messageDuration={messageDuration}
      />
    );

    expect(screen.getByText(avatar)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.queryByTestId("message")).not.toBeInTheDocument();
  });

  test("open reactionList when click on avatar", async () => {
    render(
      <PlayerHub
        avatar={avatar}
        name={name}
        messageDuration={messageDuration}
      />
    );

    await userEvent.click(screen.getByText(avatar));

    expect(screen.getByText("Você é bom!")).toBeInTheDocument();
    expect(screen.getByText("Uau!!")).toBeInTheDocument();
    expect(screen.getByText("😎")).toBeInTheDocument();
    expect(screen.getByText("🤛")).toBeInTheDocument();
  });

  test.each(["Você é bom!", "Uau!!", "Quero revanche", "😎", "🤛"])(
    `should show a message when click in reaction %i`,
    async (reaction) => {
      render(
        <PlayerHub
          avatar={avatar}
          name={name}
          messageDuration={messageDuration}
        />
      );

      userEvent.click(screen.getByText(avatar));

      const reactButton = screen.getByText(reaction);
      userEvent.click(reactButton);
      expect(reactButton).not.toBeInTheDocument();

      const message = await screen.findByText(reaction);
      expect(message).toBeInTheDocument();
    }
  );
});
