import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import Social from './social';

const Container = styled.div`
  text-align: center;
`

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 85vh;
`

const Description = styled.p`
  padding: 0;
  margin-bottom: 2rem;
  font-size: 1.4rem;
`

const NameHeader = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0;
`

const LandingBio = () => (
  <StaticQuery
    query={graphql`
      query LandingSiteTitleQuery {
        site {
          siteMetadata {
            title
            subtitle
            whatIDo
            hirePhrasing
          }
        }
      }
    `}
    render={data => (
      <OuterContainer>
        <Container>
          <NameHeader>Hi ! I'm {data.site.siteMetadata.title}</NameHeader>
          <Description>{data.site.siteMetadata.subtitle}</Description>
          <Description>{data.site.siteMetadata.whatIDo}</Description>
          <Description>{data.site.siteMetadata.hirePhrasing}</Description>
        </Container>
        <Social />
      </OuterContainer>
    )}
  />
)

NameHeader.propTypes = {
  siteTitle: PropTypes.string,
  subtitle: PropTypes.string,
}

NameHeader.defaultProps = {
  siteTitle: ``,
  subtitle: ``,
}

export default LandingBio
