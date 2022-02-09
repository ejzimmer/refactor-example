import styled from "styled-components"

export function Postage({ postage }) {
  return (
    <>
      {postage >= 0 ? (
        <PostageAmount>Postage = ${postage}</PostageAmount>
      ) : (
        <Error>Could not calculate postage. Please contact us.</Error>
      )}
    </>
  )
}

const PostageAmount = styled.div`
  color: green;
`
const Error = styled.div`
  color: red;
`
