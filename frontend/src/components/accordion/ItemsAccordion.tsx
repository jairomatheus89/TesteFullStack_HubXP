import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

interface AccordionProps {
  expand: boolean;
  expandHandle: () => void;
  renderItem: () => React.ReactNode;
}

export default function ItemsAccordion({renderItem, expand, expandHandle}: AccordionProps){


  return(
    <Accordion expanded={expand} sx={{width: '100%'}}>
      <AccordionSummary
        expandIcon={<Add/>}
        onClick={expandHandle}
        sx={{
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',

          '& .MuiAccordionSummary-expandIconWrapper': {
            margin: 0,
          },
        }}
      >
        <Typography>ADD</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display:'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          maxHeight: 200,
          gap:1
        }}
      >
        {renderItem()}    
      </AccordionDetails>
    </Accordion>
  );
}