import React from 'react';
import ReactDOM from 'react-dom';
import forge from 'node-forge';
import './index.css';

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.props.handleSubmit(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <div className="form-group">
                        <input className="form-control" id="exampleInputEmail1" placeholder={this.props.placeholder}
                            onChange={this.handleChange} />
                    </div>
                </label>
                <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: "Input to be hashed",
            value: "",
        }
    }

    handleSubmit(input) {
        this.setState({ "value": input });
    }

    render() {
        const hashes = {
            "sha1": forge.md.sha1,
            "sha256": forge.md.sha256,
            "sha512": forge.md.sha512,
            "md5": forge.md.md5,
        }

        const moves = Object.keys(hashes).map((value) => {
            if(this.state.value != "") {
                let md = hashes[value].create();
                md.update(this.state.value);
                const hash = md.digest().toHex();
                return (
                    <tr key={value}>
                        <td>{value}</td>
                        <td>{hash}</td>
                    </tr>
                )
            }
        });

        return (
            <div className="hash">
                <div className="input">
                    <InputForm
                        placeholder={this.state.placeholder}
                        handleSubmit={(i) => this.handleSubmit(i)}
                    />
                </div>
                <div className="hash-info">
                    <table>
                        <thead>
                            <tr>
                                <th>Algorithm</th>
                                <th>Hash</th>
                            </tr>
                        </thead>
                        <tbody>{moves}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
