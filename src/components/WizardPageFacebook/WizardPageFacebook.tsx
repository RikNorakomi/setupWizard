import React, {useEffect} from "react";
import {OutlinedInput} from "@material-ui/core";
import {makeStyles, styled} from "@material-ui/core/styles";
import MenuHeading from "../sharedComponents/MenuHeading";
import {UserInputKeys} from "../../SetupWizard";

interface Props {
    handleFacebookPageChange: <T>(propName: UserInputKeys, value: T) => void;
    setIsNextStepAllowed: React.Dispatch<React.SetStateAction<boolean>>;
    fbPage: string;
};

const styles = {
    menuTopic: {
        "text-align": "center"
    }
};

const FbPageInput = styled(OutlinedInput)({
    width: "80%",
    marginTop: "2rem"
});

const useStyles = makeStyles(styles);

const WizardPageFacebook = ({handleFacebookPageChange, setIsNextStepAllowed, fbPage}: Props) => {
    const classes = useStyles();
    const isValueValid = true;

    useEffect(() => {
        setIsNextStepAllowed(isValueValid);
    });

    return (
        <section className={classes.menuTopic}>
            <MenuHeading text="Add the facebook page endpoint:"/>
            <p>www.facebook.com/{fbPage}</p>
            <FbPageInput
                autoFocus
                onChange={(e) => handleFacebookPageChange("facebookPage", e.target.value)}
                placeholder="Add the facebook page here (min. 2 characters)"
                required
                value={fbPage}
            />
        </section>
    );
};

export default WizardPageFacebook;
