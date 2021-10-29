import { atom } from 'recoil';
import { Atoms } from '../constants';

export const mainnetData = atom({
	key: Atoms.MAINNET_DATA,
	default: [],
});

export const optimismData = atom({
	key: Atoms.OPTIMISTIC_DATA,
	default: [],
});

export const arbitumData = atom({
	key: Atoms.ARBITUM_DATA,
	default: [],
});
