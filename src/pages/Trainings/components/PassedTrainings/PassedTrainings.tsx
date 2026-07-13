import styles from './PassedTrainings.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { Training } from '../../../../types';
import { useSelector } from 'react-redux';
import { getUserRoleSelector } from '../../../../store/selectors';

interface PassedTrainingsProps {
  trainings: Training[];
}

const PassedTrainings = ({ trainings }: PassedTrainingsProps) => {
  const role = useSelector(getUserRoleSelector);
  const isTrainer = role === 'TRAINER';
  return (
  <TableContainer className={styles.tableContainer}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={styles.headCell}>DATE</TableCell>
          <TableCell className={styles.headCell}>TRAINING NAME</TableCell>
          <TableCell className={styles.headCell}>TYPE</TableCell>
          <TableCell className={styles.headCell}>{isTrainer ? "STUDENT NAME" : "TRAINER NAME"}</TableCell>
          <TableCell className={styles.headCell}>DURATION</TableCell>
          <TableCell className={styles.headCell}>STATUS</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {trainings.map((training, index) => {
          const isScheduled = new Date(training.trainingDate) > new Date();

          return(
            <TableRow key={`${training.trainingName}-${index}`}>
              <TableCell className={styles.cell}>{training.trainingDate}</TableCell>
              <TableCell className={styles.nameCell}>{training.trainingName}</TableCell>
              <TableCell className={styles.cell}>
                <span className={styles.badge}>{training.trainingType}</span>
              </TableCell>
              <TableCell className={styles.cell}>{'trainerName' in training ? training.trainerName : training.traineeName}</TableCell>
              <TableCell className={styles.cell}>{training.duration} hours</TableCell>
              <TableCell className={styles.cell}>
                <span className={isScheduled ? styles.statusScheduled : styles.statusCompleted}>
                  {isScheduled ? 'SCHEDULED' : 'COMPLETED'}
                </span>
              </TableCell>
            </TableRow>
          )
        })
        }
      </TableBody>
    </Table>
  </TableContainer>
)
};

export default PassedTrainings;