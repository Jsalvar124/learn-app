import styles from './PassedTrainings.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { Training } from '../../../../types';

interface PassedTrainingsProps {
  trainings: Training[];
}

const PassedTrainings = ({ trainings }: PassedTrainingsProps) => (
  <TableContainer className={styles.tableContainer}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={styles.headCell}>DATE</TableCell>
          <TableCell className={styles.headCell}>TRAINING NAME</TableCell>
          <TableCell className={styles.headCell}>TYPE</TableCell>
          <TableCell className={styles.headCell}>TRAINER NAME</TableCell>
          <TableCell className={styles.headCell}>DURATION</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {trainings.map((training, index) => (
          <TableRow key={`${training.name}-${index}`}>
            <TableCell className={styles.cell}>{training.date}</TableCell>
            <TableCell className={styles.nameCell}>{training.name}</TableCell>
            <TableCell className={styles.cell}>
              <span className={styles.badge}>{training.type}</span>
            </TableCell>
            <TableCell className={styles.cell}>{training.trainerName}</TableCell>
            <TableCell className={styles.cell}>{training.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PassedTrainings;