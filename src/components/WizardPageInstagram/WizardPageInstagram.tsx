import React, {useEffect} from "react";
import {OutlinedInput} from "@material-ui/core";
import {makeStyles, styled} from "@material-ui/core/styles";
import MenuHeading from "../sharedComponents/MenuHeading";
import {UserInputKeys} from "../../SetupWizard";

interface Props {
    handleInstagramPageChange: <T>(propName: UserInputKeys, value: T) => void;
    setIsNextStepAllowed: React.Dispatch<React.SetStateAction<boolean>>;
    instagramPage: string;
};

const styles = {
    menuTopic: {
        "text-align": "center"
    }
};

const InstagramPageInput = styled(OutlinedInput)({
    width: "80%",
    marginTop: "2rem"
});

const useStyles = makeStyles(styles);

const WizardPageInstagram = ({handleInstagramPageChange, setIsNextStepAllowed, instagramPage}: Props) => {
    const classes = useStyles();
    const isValueValid = instagramPage.trim().length >= 2;

    useEffect(() => {
        setIsNextStepAllowed(isValueValid);
    });

    return (
        <section className={classes.menuTopic}>
            <MenuHeading text="Add the instagram channel:"/>
            <p>www.instagram.com/{instagramPage}</p>
            <InstagramPageInput
                autoFocus
                onChange={(e) => handleInstagramPageChange("instagramPage", e.target.value)}
                placeholder="Add the instagram channel here (min. 2 characters)"
                required
                value={instagramPage}
            />
        </section>
    );
};

export default WizardPageInstagram;
