import React, {useState} from 'react';
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import MenuTopic from "./components/MenuTopic/MenuTopic";
import MenuStyles from "./components/MenuStyles/MenuStyles";
import MenuSearch from "./components/MenuSearch/MenuSearch";
import WizardPageFacebook from "./components/WizardPageFacebook/WizardPageFacebook";
import SetupStepper from "./components/SetupStepper/SetupStepper";
import theme from "./theme/theme";
import createColorObj from "./miscellaneous/createColorObj";
import {SchemeObj, UserInput} from "./interfaces/interfaces";
import WizardPageInstagram from "./components/WizardPageInstagram/WizardPageInstagram";
import WizardPageBooks from "./components/WizardPageInstagram/WizardPageBooks";
import WizardPageVideo from "./components/WizardPageInstagram/WizardPageVideo";

const styles = {
    wizardWrapper: {
        width: "100%",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "100%",
        gridTemplateRows: `calc(100vh - 150px - ${theme.spacing(1) * 2}px) 150px`, // row structure: ...
        // ... `calc(100vh - stepper height - wizardWrapper padding) stepper height`
        justifyContent: "stretch",
        justifyItems: "center",
        padding: `${theme.spacing(1)}px`
    }
};

const useStyles = makeStyles(styles);

const initialUserInput: {
    appTopic: string;
    schemeObj: SchemeObj;
    selectedModules: { twitter: boolean; books: boolean; facebook: boolean; reddit: boolean; websites: boolean; audio: boolean; instagram: boolean; video: boolean; events: boolean };
    facebookPage: string;
    instagramPage: string;
    videoQuery: string;
    booksQuery: string;
}
    = {
    appTopic: "",
    facebookPage: "",
    instagramPage: "",
    booksQuery: "",
    videoQuery: "",
    schemeObj: createColorObj(theme),
    selectedModules: {
        audio: false,
        books: false,
        events: false,
        instagram: false,
        facebook: false,
        reddit: false,
        twitter: false,
        video: false,
        websites: false
    },
};

// https://stackoverflow.com/questions/56312165/using-the-keys-of-an-object-literal-as-a-typescript-type
const frozenObjCopy = Object.freeze(initialUserInput);
export type UserInputKeys = keyof typeof frozenObjCopy;


const SetupWizard = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(1);
    const [isNextStepAllowed, setIsNextStepAllowed] = useState(false);
    const [userInput, setUserInput] = useState(initialUserInput);
    const [mediaModules, setMediaModules] = useState({});

    function handleChange<T>(propName: UserInputKeys, value: T): void {
        setUserInput(prev => ({...prev, [propName]: value}));
    }

    const menus = [
        {
            label: "Create app topic",
            component:
                <MenuTopic
                    handleTopicChange={handleChange}
                    setIsNextStepAllowed={setIsNextStepAllowed}
                    value={userInput.appTopic}
                />
        },
        {
            label: "Select color scheme",
            component:
                <MenuStyles
                    handleSchemeChange={handleChange}
                    schemeObj={userInput.schemeObj}
                    setIsNextStepAllowed={setIsNextStepAllowed}
                    theme={theme}
                />
        },
        {
            label: "Select modules",
            component: <MenuSearch
                handleModuleChange={handleChange}
                selectedModules={userInput.selectedModules}
                setIsNextStepAllowed={setIsNextStepAllowed}
            />
        },
        {
            label: "Add facebook page",
            component: <WizardPageFacebook
                handleFacebookPageChange={handleChange}
                setIsNextStepAllowed={setIsNextStepAllowed}
                fbPage={userInput.facebookPage}
            />
        },
      {
        label: "Add Instagram page",
        component: <WizardPageInstagram
            handleInstagramPageChange={handleChange}
            setIsNextStepAllowed={setIsNextStepAllowed}
            instagramPage={userInput.instagramPage}
        />
      },
      {
        label: "Add book query",
        component: <WizardPageBooks
            initialTextFieldValue={userInput.appTopic}
            handleBooksQueryChange={handleChange}
            setIsNextStepAllowed={setIsNextStepAllowed}
            booksQuery={userInput.booksQuery}
        />
      },
      {
        label: "Add video query for Youtube",
        component: <WizardPageVideo
            initialTextFieldValue={userInput.appTopic}
            handleVideoQueryChange={handleChange}
            setIsNextStepAllowed={setIsNextStepAllowed}
            videoQuery={userInput.videoQuery}
        />
      }
    ];

    return (
        <ThemeProvider theme={theme}>
            <main className={classes.wizardWrapper}>
                {menus[activeStep - 1].component}
                <SetupStepper
                    activeStep={activeStep}
                    mediaModules={mediaModules}
                    menuLabels={menus.map(({label}) => label)}
                    isNextStepAllowed={isNextStepAllowed}
                    setActiveStep={setActiveStep}/>
            </main>
        </ThemeProvider>
    );
};

export default SetupWizard;
