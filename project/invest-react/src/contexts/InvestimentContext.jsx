import { createContext, useState, useContext } from 'react';
import { Timestamp } from 'firebase/firestore';

import { Firestore } from '../services/firebase';

export const InvestimentContext = createContext({});

export function InvestimentProvider({ children }) {
  const [isShowRemoveInvestModal, setIsShowRemoveInvestModal] = useState(false);

  const [isShowCreateInvestDrawer, setIsShowCreateInvestDrawer] =
    useState(false);

  const [investiments, setInvestiments] = useState([]);

  const [investimentToBeRemoved, setInvestimentToBeRemoved] = useState({
    id: 0,
    title: '',
  });

  const toogleCreateInvestDrawer = () => {
    setIsShowCreateInvestDrawer(!isShowCreateInvestDrawer);
  };

  const toogleRemoveInvestModal = () => {
    setIsShowRemoveInvestModal(!isShowRemoveInvestModal);
  };

  const loadInvestiments = async () => {
    const investiments = await Firestore.read('investiments');

    setInvestiments(investiments);
  };

  const createInvestiment = async (investiment) => {
    investiment.start = Timestamp.fromDate(new Date(investiment.start));

    investiment.end = Timestamp.fromDate(new Date(investiment.end));

    const { id } = await Firestore.create('investiments', investiment);

    const newInvestiment = { id, ...investiment };

    setInvestiments([...investiments, newInvestiment]);
  };

  const removeInvestiment = async (id) => {
    const newInvestiments = investiments.filter(
      (investiment) => investiment.id !== id
    );

    setInvestiments(newInvestiments);

    await Firestore.remove('investiments', id);
  };

  return (
    <InvestimentContext.Provider
      value={{
        isShowRemoveInvestModal,
        toogleRemoveInvestModal,
        isShowCreateInvestDrawer,
        toogleCreateInvestDrawer,
        investiments,
        setInvestiments,
        investimentToBeRemoved,
        setInvestimentToBeRemoved,
        loadInvestiments,
        createInvestiment,
        removeInvestiment,
      }}
    >
      {children}
    </InvestimentContext.Provider>
  );
}

export function useInvestiment() {
  return useContext(InvestimentContext);
}
