import { Typography } from '@mui/material';
import { PageContainer } from '../cmps/layout-cmps/PageContainer';

const About = () => {
    return <PageContainer>
        <Typography sx={{borderBottom: '1px solid #fff', marginBottom: '5px'}} variant='h2'>About us...</Typography>
        <Typography paragraph={true}>
            Yarden Koska & Aviv Rahamim
        </Typography>
    </PageContainer>
}

export default About;