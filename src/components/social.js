import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import { SocialIcon } from "react-social-icons"

const Container = styled.div`
  text-align: center;
`

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: auto;
`

const StyledSocial = styled(SocialIcon)`
    margin: 0 15px;
`

const Social = () => (
  <StaticQuery
    query={graphql`
      query SocialQuery {
        site {
          siteMetadata {
            social {
              network
              url
            }
          }
        }
      }
    `}
    render={data => {
      const social = data.site.siteMetadata.social
      return (
        <OuterContainer>
          <Container>
            {social.filter(network => network.url).map(network => (
              <StyledSocial url={network.url} bgColor="#000" />
            ))}
          </Container>
        </OuterContainer>
      )
    }}
  />
)

export default Social
