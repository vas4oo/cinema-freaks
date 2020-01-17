import * as React from 'react';
import { MovieModel } from '../../models/movieModel';
import MainService from '../../services/mainService';
import Spinner from '../../common/components/spinner/spinner';
import Growl from '../../common/components/growl/growl';

interface IProps {
    history?: any;
    location?: any;
}

interface IState {
    movies: Array<MovieModel>;
    isLoading: boolean;
}

class MovieComponent extends React.Component<IProps, IState>{
    mainService = new MainService();
    growl: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            movies: new Array<MovieModel>(),
            isLoading: false
        }
    }

    componentDidMount() {
        this.getAllMovies();
    }

    getAllMovies() {
        this.setState({ isLoading: true });

        this.mainService.getAllMovies().then(
            (data: any) => {
                this.setState({
                    isLoading: false,
                    movies: data
                })
            }
        )
            .catch(error => {
                this.setState({
                    isLoading: false
                }, () => this.growl.show({ severity: 'error', summary: error.message }));
            });
    }

    render() {
        const { movies, isLoading } = this.state;
        console.log(movies);
        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                {isLoading ? <Spinner /> : null}

            </div>);
    }
}

export default MovieComponent;
