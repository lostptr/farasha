import { Button, Modal, Text } from "@mantine/core";

interface DialogProps {
  opened: boolean;
  title: string;
  message: string;
  onSubmit: (option: boolean) => void;
  confirmMessage?: string;
  cancelMessage?: string;
}

export function Dialog({
  opened,
  title,
  message,
  onSubmit,
  confirmMessage,
  cancelMessage,
}: DialogProps) {
  const quit = (option: boolean) => {
    onSubmit(option);
  };

  return (
    <Modal opened={opened} onClose={() => quit(false)} title={title} centered>
      <Text>{message}</Text>
      <div
        style={{
          display: "flex",
          columnGap: 16,
          flexDirection: "row-reverse",
          marginTop: 32,
        }}
      >
        <Button onClick={() => quit(true)} variant="filled" color="red">
          {confirmMessage ?? "Confirm"}
        </Button>
        <Button onClick={() => quit(false)} variant="default">
          {cancelMessage ?? "Cancel"}
        </Button>
      </div>
    </Modal>
  );
}
