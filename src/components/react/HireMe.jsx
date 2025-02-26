import * as React from 'react'
import { Image } from 'astro:assets';
import styled from '@emotion/styled'

import { PROFILE_URL } from '../../consts'

const StyledMaltButton = styled.button`
    display: inline-flex;
    gap: 5px;
    align-items: center;
    background-color: white;
    color: #fc5757;
    padding: 10px;
    font-weight: 900;
    border: 2px solid #fc5757;
    border-radius: 10px;
    cursor: pointer;
    font-size: 20px;
`;

export const HireMe = () => (
    <div class="hire-me">
        <a href={PROFILE_URL['malt']} target='_blank'>
            <StyledMaltButton>
            <span>Hire me on</span><img src='https://dam.malt.com/cms-front/maltLogo.png' width={120} height={40}/>
            </StyledMaltButton>
        </a>
  </div>
)
