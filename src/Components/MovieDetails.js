
import '../App.css'; 
function MovieDetails (props) {
const  movieDetails = props.movieDetails;
return (

    <>
        <div className="modal fade show d-block" id="myModal" focus="true">
            <div className="modal-dialog details-dialog">
                <div className="modal-content details-content">
                    <div className="modal-header details-header" id="borderBottom">
                        <h4 className="modal-title details-title">{movieDetails.title}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={props.onHide}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row movie-details-title"> Year </div>
                        <div className="row movie-details-content"> {movieDetails.year} </div>
                        <div className="row movie-details-title"> Genre </div>
                        <div className="row movie-details-content"> {movieDetails.genre} </div>
                        <div className="row movie-details-title"> Description </div>
                        <div className="row movie-details-content"> {movieDetails.description} </div>
                        <div className="row">  
                            <div className="col-2 movie-details-title"> Director </div>
                            <div className="col-5 movie-details-title">Actors</div>
                        </div>
                        <div className="row">  
                            <div className="col-2 movie-people">{movieDetails.director}</div>
                            <div className="col-5 movie-people">{movieDetails.actors}</div>
                        </div>
                        <div className="row movie-details-title"> Runtime </div>
                        <div className="row movie-details-content"> {movieDetails.runtime} </div>
                        <div className="row movie-details-title"> Rating </div>
                        <div className="row movie-details-content"> {movieDetails.rating} </div>
                        <div className="row movie-details-title"> Votes </div>
                        <div className="row movie-details-content"> {movieDetails.votes} </div>
                        <div className="row movie-details-title"> Revenue </div>
                        <div className="row movie-details-content"> {movieDetails.revenue} </div>
                        <div className="row movie-details-title"> Metascore </div>
                        <div className="row movie-details-content"> {movieDetails.metascore} </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}
export default MovieDetails;


