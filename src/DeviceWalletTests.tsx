import { CredentialsStorage, DeviceWallet } from '@thirdweb-dev/wallets';
import {
	PASSWORD,
	WRONG_PASSWORD,
	PRIVATE_KEY,
	ENCRYPTED_PRIVATE_KEY,
	MNEMONIC,
	WRONG_MNEMONIC,
	ENCRYPTED_MNEMONIC,
	ENCRYPTED_JSON,
} from './constants';

const deviceWallet = new DeviceWallet();

export function DeviceWalletTests() {
	return (
		<div className='container'>
			<p> Generate </p>
			<button
				onClick={async () => {
					const address = await deviceWallet.generate();
					console.log('created', address);
				}}
			>
				generate random
			</button>

			<p> connect </p>
			<button
				onClick={async () => {
					const address = await deviceWallet.connect();
					console.log('connected to', address);
				}}
			>
				connect
			</button>

			<hr />

			<p> save </p>
			<Save />

			<p> load </p>
			<Load />

			<hr />

			<p> import </p>
			<Import />

			<p> export </p>
			<Export />

			<hr />

			<p> delete saved </p>
			<button
				onClick={async () => {
					await deviceWallet.deleteSaved();
					console.log('deleted');
				}}
			>
				delete saved
			</button>

			<hr />

			<p> custom encryption export </p>
			<CustomEncryption />

			<p> custom decryption load </p>
			<CustomDecryption />

			<hr />

			<p> credential storage </p>
			<CredStorageSave />
		</div>
	);
}

function Save() {
	return (
		<div className='btn-group'>
			<button
				onClick={async () => {
					await deviceWallet.save({ strategy: 'privateKey', encryption: false });
					console.log('saved');
				}}
			>
				private key
			</button>

			<button
				onClick={async () => {
					await deviceWallet.save({ strategy: 'mnemonic', encryption: false });
					console.log('saved');
				}}
			>
				mnemonic
			</button>

			<button
				className='encrypted'
				onClick={async () => {
					await deviceWallet.save({ strategy: 'encryptedJson', password: PASSWORD });
					console.log('saved');
				}}
			>
				encrypted json
			</button>

			<button
				className='encrypted'
				onClick={async () => {
					await deviceWallet.save({
						strategy: 'privateKey',
						encryption: {
							password: PASSWORD,
						},
					});
					console.log('saved');
				}}
			>
				encrypted private key
			</button>

			<button
				className='encrypted'
				onClick={async () => {
					await deviceWallet.save({
						strategy: 'mnemonic',
						encryption: {
							password: PASSWORD,
						},
					});
					console.log('saved');
				}}
			>
				encrypted mnemonic
			</button>
		</div>
	);
}

function Load() {
	return (
		<div className='btn-group'>
			<button
				onClick={async () => {
					const res = await deviceWallet.load({
						strategy: 'privateKey',
						encryption: false,
					});

					console.log('loaded', res);
				}}
			>
				private key
			</button>

			<button
				onClick={async () => {
					const res = await deviceWallet.load({
						strategy: 'mnemonic',
						encryption: false,
					});

					console.log('loaded', res);
				}}
			>
				mnemonic
			</button>

			<button
				className='encrypted'
				onClick={async () => {
					const res = await deviceWallet.load({
						strategy: 'encryptedJson',
						password: PASSWORD,
					});

					console.log('loaded', res);
				}}
			>
				encrypted json
			</button>

			<button
				className='encrypted'
				onClick={async () => {
					const res = await deviceWallet.load({
						strategy: 'privateKey',
						encryption: {
							password: PASSWORD,
						},
					});

					console.log('loaded', res);
				}}
			>
				encrypted private key
			</button>

			<button
				className='encrypted'
				onClick={async () => {
					const res = await deviceWallet.load({
						strategy: 'mnemonic',
						encryption: {
							password: PASSWORD,
						},
					});

					console.log('loaded', res);
				}}
			>
				encrypted mnemonic
			</button>

			<button
				className='encrypted wrong-password'
				onClick={async () => {
					const res = await deviceWallet.load({
						strategy: 'mnemonic',
						encryption: {
							password: WRONG_PASSWORD,
						},
					});

					console.log('loaded', res);
				}}
			>
				encrypted mnemonic (wrong password)
			</button>

			<button
				className='encrypted wrong-password'
				onClick={async () => {
					const res = await deviceWallet.load({
						strategy: 'privateKey',
						encryption: {
							password: WRONG_PASSWORD,
						},
					});

					console.log('loaded', res);
				}}
			>
				encrypted private key (wrong password)
			</button>
		</div>
	);
}

function Import() {
	return (
		<div className='btn-group'>
			<button
				onClick={async () => {
					const address = await deviceWallet.import({
						privateKey: PRIVATE_KEY,
						encryption: false,
					});
					console.log('loaded', address);
				}}
			>
				private key
			</button>

			<button
				className='invalid'
				onClick={async () => {
					const address = await deviceWallet.import({
						privateKey: PRIVATE_KEY + 'wrong',
						encryption: false,
					});
					console.log('loaded', address);
				}}
			>
				invalid private key
			</button>

			<button
				className='encrypted'
				onClick={async () => {
					const address = await deviceWallet.import({
						privateKey: ENCRYPTED_PRIVATE_KEY,
						encryption: {
							password: PASSWORD,
						},
					});
					console.log('loaded', address);
				}}
			>
				encrypted private key
			</button>

			<button
				className='encrypted wrong-password'
				onClick={async () => {
					const address = await deviceWallet.import({
						privateKey: ENCRYPTED_PRIVATE_KEY,
						encryption: {
							password: WRONG_PASSWORD,
						},
					});
					console.log('loaded', address);
				}}
			>
				encrypted private key (wrong-password)
			</button>

			<button
				onClick={async () => {
					const address = await deviceWallet.import({
						mnemonic: MNEMONIC,
						encryption: false,
					});
					console.log('loaded', address);
				}}
			>
				mnemonic
			</button>

			<button
				onClick={async () => {
					const address = await deviceWallet.import({
						mnemonic: WRONG_MNEMONIC,
						encryption: false,
					});
					console.log('loaded', address);
				}}
			>
				invalid mnemonic
			</button>

			<button
				className='encrypted'
				onClick={async () => {
					const address = await deviceWallet.import({
						mnemonic: ENCRYPTED_MNEMONIC,
						encryption: {
							password: PASSWORD,
						},
					});
					console.log('loaded', address);
				}}
			>
				encrypted mnemonic
			</button>

			<button
				className='encrypted wrong-password'
				onClick={async () => {
					const address = await deviceWallet.import({
						mnemonic: ENCRYPTED_MNEMONIC,
						encryption: {
							password: WRONG_PASSWORD,
						},
					});
					console.log('loaded', address);
				}}
			>
				encrypted mnemonic (wrong password)
			</button>

			<button
				className='encrypted'
				onClick={async () => {
					const json = await deviceWallet.import({
						encryptedJson: ENCRYPTED_JSON,
						password: PASSWORD,
					});
					console.log('loaded', json);
				}}
			>
				encrypted json
			</button>

			<button
				className='invalid'
				onClick={async () => {
					const json = await deviceWallet.import({
						encryptedJson: ENCRYPTED_JSON + 'wrong',
						password: PASSWORD,
					});
					console.log('loaded', json);
				}}
			>
				invalid encrypted json
			</button>

			<button
				className='encrypted wrong-password'
				onClick={async () => {
					const json = await deviceWallet.import({
						encryptedJson: ENCRYPTED_JSON,
						password: WRONG_PASSWORD,
					});
					console.log('loaded', json);
				}}
			>
				encrypted json (wrong password)
			</button>
		</div>
	);
}

function Export() {
	return (
		<div className='btn-group'>
			<button
				onClick={async () => {
					const pKey = await deviceWallet.export({
						strategy: 'privateKey',
						encryption: false,
					});
					console.log('exported', pKey);
				}}
			>
				private key
			</button>

			<button
				onClick={async () => {
					const pKey = await deviceWallet.export({
						strategy: 'mnemonic',
						encryption: false,
					});
					console.log('exported', pKey);
				}}
			>
				mnemonic
			</button>

			<button
				className='encrypted'
				onClick={async () => {
					const json = await deviceWallet.export({
						strategy: 'encryptedJson',
						password: PASSWORD,
					});
					console.log('exported', json);
				}}
			>
				encrypted json
			</button>

			<button
				className='encrypted'
				onClick={async () => {
					const pKey = await deviceWallet.export({
						strategy: 'privateKey',
						encryption: {
							password: PASSWORD,
						},
					});
					console.log('exported', pKey);
				}}
			>
				encrypted private key
			</button>

			<button
				className='encrypted'
				onClick={async () => {
					const pKey = await deviceWallet.export({
						strategy: 'mnemonic',
						encryption: {
							password: PASSWORD,
						},
					});
					console.log('exported', pKey);
				}}
			>
				encrypted mnemonic
			</button>
		</div>
	);
}

async function customEncryption(message: string, password: string) {
	return message + ' !!!!!!! ' + password;
}

async function customDecryption(message: string, password: string) {
	return message.replace(' !!!!!!! ' + password, '');
}

function CustomEncryption() {
	return (
		<div className='btn-group'>
			<button
				className='encrypted'
				onClick={async () => {
					const pKey = await deviceWallet.export({
						strategy: 'privateKey',
						encryption: {
							password: PASSWORD,
							encrypt: customEncryption,
						},
					});
					console.log('exported', pKey);
				}}
			>
				encrypted private key
			</button>

			<button
				className='encrypted'
				onClick={async () => {
					const pKey = await deviceWallet.export({
						strategy: 'mnemonic',
						encryption: {
							password: PASSWORD,
							encrypt: customEncryption,
						},
					});
					console.log('exported', pKey);
				}}
			>
				encrypted mnemonic
			</button>
		</div>
	);
}

function CustomDecryption() {
	return (
		<div className='btn-group'>
			<button
				className='encrypted'
				onClick={async () => {
					const address = await deviceWallet.import({
						privateKey:
							'0x3f6e3b44c50bd6ea00fd5c551ebf833bbac754d3a160e896f2250b964e749e98 !!!!!!! 12345',
						encryption: {
							password: PASSWORD,
							decrypt: customDecryption,
						},
					});
					console.log('loaded', address);
				}}
			>
				encrypted private key
			</button>

			<button
				className='encrypted wrong-password'
				onClick={async () => {
					const address = await deviceWallet.import({
						privateKey:
							'0x3f6e3b44c50bd6ea00fd5c551ebf833bbac754d3a160e896f2250b964e749e98 !!!!!!! 12345',
						encryption: {
							password: WRONG_PASSWORD,
							decrypt: customDecryption,
						},
					});
					console.log('loaded', address);
				}}
			>
				encrypted private key (wrong password)
			</button>
		</div>
	);
}

const credStorage = new CredentialsStorage();

function CredStorageSave() {
	return (
		<div className='btn-group'>
			<button
				onClick={async () => {
					await deviceWallet.save({
						strategy: 'encryptedJson',
						storage: credStorage,
						password: PASSWORD,
					});
					console.log('saved');
				}}
			>
				save encrypted json
			</button>

			<button
				className='encrypted '
				onClick={async () => {
					const address = await deviceWallet.load({
						strategy: 'encryptedJson',
						storage: credStorage,
						password: PASSWORD,
					});
					console.log('saved', address);
				}}
			>
				load from storage - encrypted json
			</button>

			<button
				onClick={async () => {
					await deviceWallet.save({
						strategy: 'privateKey',
						storage: credStorage,
						encryption: false,
					});
					console.log('saved');
				}}
			>
				save private key
			</button>

			<button
				onClick={async () => {
					const address = await deviceWallet.load({
						strategy: 'privateKey',
						storage: credStorage,
						encryption: false,
					});
					console.log('loaded', address);
				}}
			>
				load from storage - private key
			</button>

			<button
				className='encrypted '
				onClick={async () => {
					await deviceWallet.save({
						strategy: 'privateKey',
						storage: credStorage,
						encryption: {
							password: PASSWORD,
						},
					});
					console.log('saved');
				}}
			>
				save encrypted private key
			</button>

			<button
				className='encrypted '
				onClick={async () => {
					const address = await deviceWallet.load({
						strategy: 'privateKey',
						storage: credStorage,
						encryption: {
							password: PASSWORD,
						},
					});
					console.log('loaded', address);
				}}
			>
				load from storage - encrypted private key
			</button>
		</div>
	);
}
