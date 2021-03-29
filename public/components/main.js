
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: 'Stumpergasse 51, 1060 Vienna',
            result: null
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    getOutlet = () => {
        let { address } = this.state;
        return axios.get('http://localhost:5100/api/outlet/nearest', { params: { address } })
            .then(data => {
                console.log(data);
                this.setState({ result: data })
            })
    }

    render = () => {
        return <div>
            <section class="wrapper">
                <input name="address" value={this.state.address} onChange={this.onChange}></input>
                <button onClick={this.getOutlet}>submit</button>
                <section>
                    {this.state.result ?
                        <section>
                            Nearest Outlet is at :
                            <strong>{this.state.result.outlet}</strong>
                        </section>
                        : ''}
                </section>
            </section>

        </div>
    }
}

ReactDOM.render(<Main />, document.getElementById('root'))