import styles from './Trainers.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '../../../../components/common/Button';

interface Trainer {
  name: string;
  specialization: string;
}

interface TrainersProps {
  trainers: Trainer[];
  onAddTrainer?: () => void;
}

const Trainers = ({ trainers, onAddTrainer }: TrainersProps) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h2 className={styles.title}>My Trainers</h2>
      <Button text="Add trainer" variant="prime" onClick={onAddTrainer} />
    </div>

    <TableContainer className={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.headCell}>NAME</TableCell>
            <TableCell className={styles.headCell}>SPECIALIZATION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainers.map((trainer) => (
            <TableRow key={trainer.name}>
              <TableCell className={styles.nameCell}>{trainer.name}</TableCell>
              <TableCell className={styles.cell}>{trainer.specialization}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

export default Trainers;