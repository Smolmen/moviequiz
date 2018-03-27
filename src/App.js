import React, { Component } from 'react';
import axios from 'axios';

import Progress from './components/progress';
import Question from './components/question';
import EndScreen from './components/endscreen';

class App extends Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      current: 0,
      loading: true,
      questions: null,
      statusClass: "",
      answers: [],
      showEndScreen: false
    }

    this.getMovieList = this.getMovieList.bind(this);
    this.getGif       = this.getGif.bind(this);
    this.selectQuestions = this.selectQuestions.bind(this);
    this.answerSelect = this.answerSelect.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  getMovieList(page = 1) {
    axios.get('https://api.themoviedb.org/4/discover/movie', {
      params: {
        api_key: this.props.moviedb_key,
        sort_by: "popularity.desc",
        page
      }
    }).then(res => {
      let movies = this.state.movies.concat(res.data.results);
      if(movies.length < 100) {
        this.getMovieList(res.data.page + 1);
      }
      else {
        this.selectQuestions();
      }
      this.setState({movies});
    });
  }

  async selectQuestions() {
    let questions = [];
    while(questions.length < this.props.questions) {

      let id = Math.floor((Math.random() * this.state.movies.length -1) + 1);
      
      let titles = [ this.state.movies[id].title ];

      let correct = titles[0];
      let gif = await this.getGif(titles[0]);

      while(titles.length < 4) {
        let nexttitle = this.state.movies[Math.floor((Math.random() * this.state.movies.length -1) + 1)];
        if(!titles.includes(nexttitle.title))
          titles.push(nexttitle.title)
      }

      shuffleArray(titles);

      
      let question = {
        id,
        titles,
        gif,
        correct
      }

      questions.push(question);
    }

    this.setState({questions, loading: false})
  }

  newGame() {
    this.setState({
      current: 0,
      loading: true,
      questions: null,
      statusClass: "",
      answers: [],
      showEndScreen: false
    });

    this.selectQuestions();
  }

  getGif(title, question) {
    return axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        q: title,
        api_key: this.props.giphy_key,
        limit: 5
      }
    }).then(res => {
      let id = Math.floor((Math.random() * res.data.data.length -1) + 1);
      return res.data.data[id].images.fixed_height.url;
    }).catch(res => console.log(res))
  }

  componentDidMount() {
    this.getMovieList();
  }

  answerSelect(answer) {
    let current = this.state.current;
    let correctAnswer = this.state.questions[current].correct;

    let isCorrect = answer === correctAnswer;

    setTimeout(() => {
      if(current+1 >= this.props.questions)
        this.setState({showEndScreen: true, statusClass: ""});
      else
        this.setState({current: current+1, statusClass: ""});
    }, 1000)
    this.setState({statusClass: isCorrect ? "correct" : "incorrect", answers: this.state.answers.concat({question: current, answer, correctAnswer, correct: isCorrect})})

  }

  render() {
    if(this.state.loading) {
      return(
        <div className="App loading">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <Progress max={this.props.questions} value={this.state.current} addClass={this.state.statusClass}/>
          {this.state.showEndScreen ?
            <EndScreen answers={this.state.answers} max={this.props.questions} startNew={this.newGame} />
          :
            <div className="container">
              {this.state.questions &&
                <Question addClass={this.state.statusClass} onSelect={this.answerSelect} gif={this.state.questions[this.state.current].gif} answers={this.state.questions[this.state.current].titles} />
              }
            </div>
          }

        </div>
      );
    }
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default App;
