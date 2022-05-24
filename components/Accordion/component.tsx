/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { ServerVideo } from '../../types/videos';
import { AccordionChildren } from './children';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(() => ({
  backgroundColor: 'transparent',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: 'transparent',
  maxHeight: '300px',
  padding: 0,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

type AccordionChildrenProps = {
  video: ServerVideo;
  disabled: boolean;
};

export const CustomAccordion: React.FC<AccordionChildrenProps> = ({ video, disabled }) => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newExpanded: boolean) => {
    event.stopPropagation();
    setExpanded(newExpanded);
  };

  return (
    <div>
      <Accordion expanded={expanded} onChange={handleChange} disabled={disabled}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography fontSize={14}>{t('T_MANAGE_VIDEO_ON_DEVICES')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionChildren video={video} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
