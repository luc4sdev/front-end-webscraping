import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import PortableWifiOff from '@mui/icons-material/PortableWifiOff';

interface Data {
  name: string,
  url: string,
  mainTag: string,
  timeTag: string,
  currecyTag: string,
  eventTag: string,
  actualTag: string,
  forecastTag: string,
  previousTag: string,
  time: string,
  currency: string,
  event: string,
  actual: string,
  forecast: string,
  previous: string,
}

interface BasicTableProps {
  data: Data[];
  buttonInterval?: boolean;
  buttonInterval2?: boolean;
  buttonInterval3?: boolean;
  removeTagForex?: (tagToRemove: string) => void;
  removeTagFinancial?: (tagToRemove: string) => void;
  removeTagInvesting?: (tagToRemove: string) => void;
}

export default function BasicTable({ data, removeTagForex, removeTagFinancial, removeTagInvesting, buttonInterval, buttonInterval2, buttonInterval3 }: BasicTableProps) {


  return (
    <TableContainer component={Paper} sx={{ marginBottom: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '1rem', fontWeight: '700' }}>Time</TableCell>
            <TableCell sx={{ fontSize: '1rem', fontWeight: '700' }}>Currency</TableCell>
            <TableCell sx={{ fontSize: '1rem', fontWeight: '700' }}>Event</TableCell>
            <TableCell sx={{ fontSize: '1rem', fontWeight: '700' }}>Actual</TableCell>
            <TableCell sx={{ fontSize: '1rem', fontWeight: '700' }}>Forecast</TableCell>
            <TableCell sx={{ fontSize: '1rem', fontWeight: '700' }}>Previous</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell sx={{ fontSize: '1rem' }}>{row.currency}</TableCell>
              <TableCell sx={{ fontSize: '1rem' }}>{row.event}</TableCell>
              <TableCell sx={{ fontSize: '1rem' }}>{row.actual}</TableCell>
              <TableCell sx={{ fontSize: '1rem' }}>{row.forecast}</TableCell>
              <TableCell sx={{ fontSize: '1rem' }}>{row.previous}</TableCell>
              <TableCell sx={{ fontSize: '1rem' }}>
                <Button disabled={row.name === 'forexfactory' ? !buttonInterval : row.name === 'financial' ? !buttonInterval2 : row.name === 'investing' ? !buttonInterval3 : false} onClick={row.name === 'forexfactory' && removeTagForex ? () => removeTagForex(row.mainTag) : row.name === 'financial' && removeTagFinancial ? () => removeTagFinancial(row.mainTag) : row.name === 'investing' && removeTagInvesting ? () => removeTagInvesting(row.mainTag) : () => {console.log('')}}>
                  <PortableWifiOff sx={{ color: 'red'}}/>
                  </Button>
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
