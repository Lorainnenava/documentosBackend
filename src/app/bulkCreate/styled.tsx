import styled from "styled-components";

export const Form = styled.form`
    width: 100%;
    display: flex;
    height: auto;
    align-items: flex-start;
    gap: 15px;
    padding: 20px;
`;

export const AddDocument = styled.button<{
    disabled?: boolean;
    borderColor?: string;
}>`
    width: 100%;
    height: 4vh;
    background: white;
    border-radius: 3px;
    border: 1px solid #c0ccda;
    display: flex;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    ${({ disabled }) =>
        disabled &&
        `
      pointer-events: none;
      cursor: not-allowed;
      background-color: #f5f6fa;
      border: 1px solid #c0ccda;
`}
`;

export const SpanDocument = styled.p`
    font-size: 15px;
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    color: #7a7a7a;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
