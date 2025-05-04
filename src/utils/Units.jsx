import { useSettings } from '../context/SettingsContext';


const useUnits = () => {
    // State
    const { settings, setSettings } = useSettings();
    const mmToPx = settings.mmToPx.value;

    return {
        mmToM: (mm) => mm / 1000,
        mmToPx: (mm) => mm * mmToPx,
        mToMm: (m) => m * 1000,
        mToPx: (m) => m * 1000 * mmToPx
    };
};

export default useUnits;