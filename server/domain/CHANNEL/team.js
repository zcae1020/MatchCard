export class team {
    constructor(teamId) {
        this.teamId = teamId;
        this.length = 0;
        this.users = [];
        /**
         * users에 담기는 object
         * {
         *      uid: uid
         *      ready: ready
         * }
         */
    }
}
