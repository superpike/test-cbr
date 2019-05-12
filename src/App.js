import React, { Component } from 'react';

import Matrix from './components/Matrix';
import Results from './components/Results';
import Button from './components/Button';
import Input from './components/Input';

import classes from './App.module.css';

class App extends Component {
  state = {
    width: 5,
    hieght: 8,
    chance: 0.5,
    showMatrix: false,
    domains: [],
    ones: [],
    res: [],
  }

  handleChangeItem = (x, y) => {
    this.setState(prevState => {
      const founded = prevState.ones.findIndex(el => {
        return (el.x === (x + 1) && el.y === (y + 1));
      });

      if (founded === -1) {
        return {
          ones: [...prevState.ones, { x: (x + 1), y: (y + 1), color: '#fff' }]
        }
      } else {
        return {
          ones: [...prevState.ones.slice(0, founded), ...prevState.ones.slice(founded + 1)]
        }
      }
    });
  }

  handleOnChangeInput = (e, direction) => {
    let val = e.target.value;
    if (direction === 'x') {
      if (val > 40) { val = 40 }
      if (val < 1) { val = 1 }
      this.setState({
        width: val,
        showMatrix: false,
      })
    }
    if (direction === 'y') {
      if (val > 40) { val = 40 }
      if (val < 1) { val = 1 }
      this.setState({
        hieght: val,
        showMatrix: false,
      })
    }
    if (direction === 'chance') {
      if (val > .99) { val = .99 }
      if (val < .01) { val = .01 }
      this.setState({
        chance: val,
        showMatrix: false,
      })
    }
  }

  handleShowClearMatrix = () => {
    this.setState({
      showMatrix: true,
      ones: []
    })
  }

  handleFindDomains = () => {
    const domains = this.findDomains(this.state.ones);
    domains.forEach(newDomain => {
      newDomain.forEach(el => {
        let item = this.state.ones.find(findEl => {
          return (
            findEl.x === el.x && findEl.y === el.y
          );
        });
        item.color = newDomain[0].color;
      })
    })

    const chance = "вручную";
    this.setState({
      domains,
      res: [...this.state.res, { chance, domainCount: domains.length, size: this.state.width * this.state.hieght }]
    });
  }

  findDomains = (ones) => {
    let newColor;
    const domains = [];
    const tempOnes = JSON.parse(JSON.stringify(ones));
    const newDomain = [];
    const checkpoints = [];
    let elCheckpoint, ind;
    while (tempOnes.length > 0) {
      newDomain.length = 0;
      checkpoints.push({ ...tempOnes[0] });
      tempOnes.shift();
      //алгоритм поиска в ширину
      while (checkpoints.length > 0) {
        elCheckpoint = { ...checkpoints[0] };
        //добавляем в новый домен
        newDomain.push(elCheckpoint);
        //проверяем соседние
        // -1,0
        ind = tempOnes.findIndex(el => {
          return (el.x === elCheckpoint.x - 1 && el.y === elCheckpoint.y)
        });
        if (ind !== -1) {
          checkpoints.push({ ...tempOnes[ind] });
          tempOnes.splice(ind, 1);
        }
        // +1,0
        ind = tempOnes.findIndex(el => {
          return (el.x === elCheckpoint.x + 1 && el.y === elCheckpoint.y)
        });
        if (ind !== -1) {
          checkpoints.push({ ...tempOnes[ind] });
          tempOnes.splice(ind, 1);
        }
        // 0,-1
        ind = tempOnes.findIndex(el => {
          return (el.x === elCheckpoint.x && el.y === elCheckpoint.y - 1)
        });
        if (ind !== -1) {
          checkpoints.push({ ...tempOnes[ind] });
          tempOnes.splice(ind, 1);
        }
        // 0,+1
        ind = tempOnes.findIndex(el => {
          return (el.x === elCheckpoint.x && el.y === elCheckpoint.y + 1)
        });
        if (ind !== -1) {
          checkpoints.push({ ...tempOnes[ind] });
          tempOnes.splice(ind, 1);
        }
        //удаляем проверенный
        checkpoints.shift();
      }
      if (newDomain.length > 0) {
        newColor = "#" + ("00000" + Math.floor(Math.random() * 0xffffff).toString(16)).slice(-6);
        domains.push(newDomain.map(el => {
          return { x: el.x, y: el.y, color: newColor };
        }));
      }
    }
    return domains;
  }

  handleAutofill = () => {
    const ones = [];
    for (let i = 0; i < this.state.width; i++) {
      for (let j = 0; j < this.state.hieght; j++) {
        if (Math.random() < this.state.chance) {
          ones.push({
            x: i + 1,
            y: j + 1,
            color: "ffffff"
          });
        }
      }
    }
    const domains = this.findDomains(ones)
    domains.forEach(newDomain => {
      newDomain.forEach(el => {
        let item = ones.find(findEl => {
          return (
            findEl.x === el.x && findEl.y === el.y
          );
        });
        item.color = newDomain[0].color;
      })
    })
    const chance = this.state.chance;
    this.setState({
      ones,
      showMatrix: true,
      domains,
      res: [...this.state.res, { chance, domainCount: domains.length, size: this.state.width * this.state.hieght }]
    });

  }

  render() {
    return (
      <div className={classes.app} >
        <h1>Подсчет доменов в матрице</h1>
        <div className={classes.settings}>
          <div className={classes.size}>
            <h2>Размеры</h2>
            <div className={classes.inputs}>
              <Input type='number' min='1' max='40' placeholder='x' value={this.state.width} changed={(e) => this.handleOnChangeInput(e, 'x')} />
              <div className={classes.divSizes}>X</div>
              <Input type='number' min='1' max='40' placeholder='y' value={this.state.hieght} changed={(e) => this.handleOnChangeInput(e, 'y')} />
            </div>
            <Button btnType='Main Middle' clicked={this.handleShowClearMatrix}>Отобразить</Button>
          </div>
          <div className={classes.domains}>
            <h2>Всего доменов</h2>
            <h3 className={classes.domainCount}>{this.state.domains.length === 0 ? 'не заполнено' : this.state.domains.length}</h3>
            <Button btnType='Main Middle' clicked={this.handleFindDomains}>Посчитать домены</Button>
          </div>
          <div className={classes.chance}>
            <h2>Вероятность</h2>
            <Input type='number' min='0.01' max='0.99' value={this.state.chance} step='0.01' changed={(e) => this.handleOnChangeInput(e, 'chance')} />
            <Button btnType='Main Middle' clicked={this.handleAutofill}>АВТО</Button>
          </div>
        </div>
        <Matrix
          x={this.state.width}
          y={this.state.hieght}
          ones={this.state.ones}
          domains={this.state.domains}
          changeItem={this.handleChangeItem}
          show={this.state.showMatrix}
          afterShow={() => this.handleShowMatrix(false)} />
        <Results res={this.state.res} />
      </div>
    );
  }
}

export default App;
