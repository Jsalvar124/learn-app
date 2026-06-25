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
          <TableRow key={`${training.trainingName}-${index}`}>
            <TableCell className={styles.cell}>{training.trainingDate}</TableCell>
            <TableCell className={styles.nameCell}>{training.trainingName}</TableCell>
            <TableCell className={styles.cell}>
              <span className={styles.badge}>{training.trainingType}</span>
            </TableCell>
            <TableCell className={styles.cell}>{'trainerName' in training ? training.trainerName : training.traineeName}</TableCell>
            <TableCell className={styles.cell}>{training.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PassedTrainings;