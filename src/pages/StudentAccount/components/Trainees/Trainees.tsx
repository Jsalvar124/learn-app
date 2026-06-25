import styles from './Trainees.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { TraineeSummary } from '../../../../types/user';

interface TrainersProps {
  trainees: TraineeSummary[];
}

const Trainees = ({ trainees }: TrainersProps) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h2 className={styles.title}>My Students</h2>
    </div>

    <TableContainer className={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.headCell}>NAME</TableCell>
            <TableCell className={styles.headCell}>EMAIL</TableCell>
            <TableCell className={styles.headCell}>STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainees.map((trainee) => (
            <TableRow key={trainee.username}>
              <TableCell className={styles.nameCell}>{`${trainee.firstName} ${trainee.lastName}`}</TableCell>
              <TableCell className={styles.cell}>{trainee.email}</TableCell>
              <TableCell className={styles.cell}>ACTIVE</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

export default Trainees;