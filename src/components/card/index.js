import React from "react";
import { LogoMap } from "../icons";
import { PrimaryButton } from "../commonStyle";
import {
    CardBody,
    CardContainer,
    CardHeader,
    CardSubTitle,
    CardTitle,
    CardListWrapper,
    CardListItem,
    CardActionButtons,
} from "./style";

const CardComponent = ({ data = {} }) => {
    const ImageComponent = LogoMap[data.image] || null;

    const renderCardList = () => {
        return data.descriptionLinks.map((description, index) => (
            <CardListItem
                key={`description-${index}`}
                isLink={description.data.includes("http")}
            >
                {description.data}
            </CardListItem>
        ));
    };

    const renderCardActionButtons = () => {
        return data.links.map((cta, index) => {
            return (
                <PrimaryButton
                    key={`cta-${index}`}
                    href={cta.url}
                    target={cta.url.includes("http") ? "_blank" : "_self"}
                >
                    {cta.title}
                </PrimaryButton>
            );
        });
    };

    return (
        <CardContainer backgroundImage={data.backgroundImage}>
            <CardHeader>{ImageComponent && <ImageComponent />}</CardHeader>
            <CardBody>
                <CardTitle>{data.title}</CardTitle>
                <CardSubTitle>{data.subTitle}</CardSubTitle>
                {data.descriptionLinks && (
                    <CardListWrapper>{renderCardList()}</CardListWrapper>
                )}
                <CardActionButtons>
                    {renderCardActionButtons()}
                </CardActionButtons>
            </CardBody>
        </CardContainer>
    );
};

export default CardComponent;
