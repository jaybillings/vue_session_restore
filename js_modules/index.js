import {createApp} from 'vue';
import {saveToSession, loadFromSession} from './sessionData.js'

const app = createApp({
    data() {
        return {
            didSubmit: false,
            favFruit: '',
            favFruitDetail: '',
            selectedFruits: [],
            selectedApple: null,
            selectedGrapeColor: null,
            showColors: false,
            grapeColors: {
                'yellow': 'Yellow/Gold',
                'green': 'Green',
                'red': 'Red/Burgundy',
                'purple': 'Purple/Indigo'
            },
            fruits: [
                'watermelon', 'grape', 'banana', 'pear', 'blueberry', 'starfruit'
            ],
            appleTypes: {
                'mc': 'Macintosh',
                'pl': 'Pink Lady',
                'fj': 'Fuji',
                'bb': 'Braeburn',
                'gd': 'Golden Delicious'
            },
            sessionSaveName: 'pageData'
        }
    },
    mounted() {
        // check for and restore information
        this.restorePageData();

        // add listener to save information
        window.addEventListener('beforeunload', () => {
            const result = saveToSession(this.sessionSaveName, this.$data);
            if (!result.success && result.message) {
                console.error(result.message);
            }
        });

        console.log('data', this.$data);
    },
    methods: {
        submitForm: function() {
            this.didSubmit = true;
        },
        resetForm: function() {
            this.didSubmit = false;
            this.favFruit = '';
            this.favFruitDetail = '';
            this.selectedFruits = [];
            this.selectedApple = null;
            this.selectedGrapeColor = null;
            this.showColors = false;
        },
        restorePageData: function () {
            const savedData = loadFromSession('pageData');

            if (!savedData.success) {
                if (savedData.message) console.warn(savedData.message);
                return;
            }

            Object.entries(savedData.data).forEach(([key, val]) => {
                if (typeof this[key] !== 'undefined') this[key] = val;
            });
        },
    }
})

app.mount('#app')
