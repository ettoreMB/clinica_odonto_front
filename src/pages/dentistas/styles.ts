import { styled } from "../../styles";
import { HStack } from "../../styles/globals";

export const Container = styled(HStack, {
  width: 'fit-content',
  gap: '1rem'
})
export const Box = styled("div", {
  display: 'inline-flex',
  alignItems: 'flex-end',
  fontSize: '2rem',
  gap:'1.5rem'
})

