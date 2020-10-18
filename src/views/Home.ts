import { Vue } from 'vue-property-decorator';

export default Vue.extend({
    components: {
    },
    data: (): any => ({
        socket: null,
        roomName: '',
        users: [],
        messages: [],
        me: '',
        messageText: ''
    }),
    created: function() {
        const self = this;

        this.me = `User-${Math.floor(Math.random() * 1000000)}`;

        this.roomId = this.$route.params ? this.$route.params.roomId : null;
        console.log('Room id: ', this.roomId);

        // Init ws
        this.socket = io(process.env.VUE_APP_api_url);

        // Init connection
        this.socket.on('connect', function(data: any) {
            self.newUserConnected(self.me);

            if (self.roomId) {
                // Join to room if has room id
                self.socket.emit('join room', self.roomId);
            }
            // Add new user
            self.socket.on('new user', (data: any) => {
                self.users = data;
            });
        });

        // Remove user when is disconnected
        this.socket.on('user disconnected', (userName: string) => {
            this.users = this.users.filter((user: any) => user !== userName)
        });



        this.socket.on('updateCount', (data: any) =>  {
            console.log(data);
        });

        // Listen to new messages
        this.socket.on('send-message', (data: any) => {
            this.messages = [...this.messages, data]
        });


        // this.socket.on('connect', function(){
        //     console.log('connect');
        //     // this.socket.emit('hello');
        // });
        // this.socket.on('event', function(data) {
        //     console.log(data);

        // });
        // this.socket.on('disconnect', function(){
        //     console.log('Disconnect');
        // });
        // this.ws = new WebSocket('ws://localhost:8888');
        // this.ws.addEventListener('open', function() {
        //     console.log('connected');

        //     // ws.send('Hi ws');
        // });
    },
    methods: {
        /**
         *  Add new user connected
         * @param userName string
         */
        newUserConnected: function(userName: string) {
            this.socket.emit('new user', userName);
            this.addToUsers(userName);
        },
        /**
         * Add user to local array
         * @param userName string
         */
        addToUsers: function(userName: any) {
            this.users = [...this.users, userName]
        },
        sendMessage: function() {
            this.socket.emit('send-message', {
                content: this.messageText,
                user: this.me
            });
            this.messageText = '';
        },
        // TODO: TODO methods
        joinRoom: function() {
            // this.socket.on(this.roomName, function(data) {
            //     console.log(data);
            // });
            this.socket.emit('join room', this.roomName);

        },
        createRoom: function() {
            this.socket.emit('createRoom', this.roomName);

            this.socket.on('createRoom', function(data: any) {
                console.log(data);

            });
            this.socket.on(this.roomName, function(data: any) {
                console.log(data);

            });
        }
    }
})
