import { Container } from '@mantine/core';
import ChangeTokenPaper from './Papers/ChangeTokenPaper';
import ChangeChatIdPaper from './Papers/ChangeChatIdPaper';

export default function ProfileSettingsCard() {
  return (
    <Container>
      <ChangeTokenPaper />
      <ChangeChatIdPaper />
    </Container>
  );
}
