import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import { SocialIcon } from "react-social-icons"

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: auto;
`

const BmcButtonLink = styled.a`
  padding: 7px 5px 7px 10px !important;
  line-height: 35px !important;
  height: 51px !important;
  min-width: 217px !important;
  text-decoration: none !important;
  display: inline-flex !important;
  color: #ffffff !important;
  background-color: #5f7fff !important;
  border-radius: 5px !important;
  border: 1px solid transparent !important;
  padding: 7px 5px 7px 10px !important;
  font-size: 20px !important;
  letter-spacing: 0.6px !important;
  box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;
  -webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
  margin: 0 auto !important;
  font-family: "Arial", cursive !important;
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
  -o-transition: 0.3s all linear !important;
  -webkit-transition: 0.3s all linear !important;
  -moz-transition: 0.3s all linear !important;
  -ms-transition: 0.3s all linear !important;
  transition: 0.3s all linear !important;

  ::hover,
  ::active,
  ::focus {
    padding: 7px 5px 7px 10px !important;
    line-height: 35px !important;
    height: 51px !important;
    min-width: 217px !important;
    text-decoration: none !important;
    display: inline-flex !important;
    color: #ffffff !important;
    background-color: #5f7fff !important;
    border-radius: 5px !important;
    border: 1px solid transparent !important;
    padding: 7px 5px 7px 10px !important;
    font-size: 20px !important;
    letter-spacing: 0.6px !important;
    box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;
    -webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
    margin: 0 auto !important;
    font-family: "Arial", cursive !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    -o-transition: 0.3s all linear !important;
    -webkit-transition: 0.3s all linear !important;
    -moz-transition: 0.3s all linear !important;
    -ms-transition: 0.3s all linear !important;
    transition: 0.3s all linear !important;
  }
`

const BmcButtonImg = styled.img`
  width: 35px !important;
  margin-bottom: 1px !important;
  box-shadow: none !important;
  border: none !important;
  vertical-align: middle !important;
`

const StyledSocial = styled(SocialIcon)`
  margin: 0 15px;
  display: inline-flex !important;
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
            <div style={{marginBottom: 10}}>
              {social
                .filter(network => network.url)
                .map((network, index) => (
                  <StyledSocial key={index} url={network.url} bgColor="#000" />
                ))}
            </div>
            <BmcButtonLink
              target="_blank"
              href="https://www.buymeacoffee.com/jzarca01"
            >
              <BmcButtonImg
                src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                alt="Buy me a Latte"
              />
              <span>
                Buy me a Latte
              </span>
            </BmcButtonLink>
          </Container>
        </OuterContainer>
      )
    }}
  />
)

export default Social
