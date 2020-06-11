import React, {Component} from 'react'


class MemeGenerator extends Component{
    constructor(){
        super()
        this.state={
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: [] 
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} =response.data
                this.setState({ allMemeImgs:memes })
            })
    }

    handleChange(event){
        const {name,value}=event.target
        this.setState({
            [name]:value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const randNum= Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg=this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })

    }

    render(){
        return(
            <div className="container">
                <div className="row row-content">
                    <p className="info">Click on <strong>Generate</strong> to generate random meme templates.</p>
                </div>
               <div className="row row-content">
                    <div className="col-12">
                    <form  onSubmit={this.handleSubmit}   >
                        <div className="form-row">
                        <div className="form-group col-12 col-sm-4">
                               
                            <input
                            className="form-control"
                                type="text"
                                placeholder="Top Text"
                                value={this.state.topText}
                                name="topText"
                                onChange={this.handleChange}
                            />
                            
                        </div>
                         
                        <div className="form-group col-12 col-sm-4">
                               
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Bottom Text"
                                value={this.state.bottomText}
                                name="bottomText"
                                onChange={this.handleChange}
                            />
                            
                        </div>

                        <div className="col-12 col-sm-4">
                            <button className="submit">Generate</button>
                        </div>

                        </div>        
                    </form>
                    </div>
                </div> 

                <div className="row row-content">
                    <div className="meme col-12 offset-sm-4 col-sm-4">
                        <img className="meme-img img-fluid d-flex" src={this.state.randomImg} alt="" />
                        <h2 className="top">{this.state.topText}</h2>
                        <h2 className="bottom">{this.state.bottomText}</h2>
                    </div>
                </div>

            </div>
        )
    }
}

export default MemeGenerator