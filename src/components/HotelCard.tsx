import {FC} from 'react'
import {Button, Card, CardBody, CardHeader, Carousel, Typography,} from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom';

interface IHotelCard {
    images: string[];
    title: string;
    description: string;
    _id: string | undefined;
}

export const HotelCard: FC<IHotelCard> = ({images, title, description, _id}) => {

    let navigate = useNavigate();

    return (
        <Card className="w-full mt-3 h-64 max-w-[48rem] flex-row">
            <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
                <Carousel className="rounded-xl h-full w-full object-cover">
                    {images.map((src) =>
                        <img
                            key={src}
                            src={src}
                            alt="image 1"
                            className="h-full w-full object-cover"
                        />
                    )}
                </Carousel>
            </CardHeader>
            <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {title}
                </Typography>
                <Typography color="gray" className="mb-2 font-normal">
                    {description.slice(0, 235)}
                </Typography>
                <Button
                    onClick={() => navigate(`/hotels/${_id}`)}
                    variant="text"
                    className="flex items-center gap-2"
                >
                    Подробнее
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                    </svg>
                </Button>
            </CardBody>
        </Card>
    )
}
