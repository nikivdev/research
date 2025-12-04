import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/repos/samui-build/samui-wallet")({
  component: SamuiWalletPage,
})

function SamuiWalletPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-mono">repos/samui-build</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <h1 className="text-lg font-semibold">samui-wallet</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <span className="text-4xl">🌴</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Samui Wallet
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Open Source Solana Wallet & Toolbox for Builders
          </p>
          <p className="text-slate-600 dark:text-slate-500 max-w-3xl mx-auto">
            A complete Wallet Standard implementation with transaction building, SPL token support,
            and multi-platform apps (web, desktop, mobile, extension).
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">TypeScript</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">@solana/kit</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">Wallet Standard</span>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="space-y-8">
          <SectionHeader icon="🏗️" title="Monorepo Architecture" subtitle="pnpm workspace structure" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Apps</h3>
                <div className="space-y-2 text-sm">
                  <AppRow name="web" desc="React web app" />
                  <AppRow name="desktop" desc="Tauri desktop app" />
                  <AppRow name="mobile" desc="React Native/Expo" />
                  <AppRow name="extension" desc="Browser extension" />
                  <AppRow name="cli" desc="Command line interface" />
                  <AppRow name="api" desc="Backend API" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Key Packages</h3>
                <div className="space-y-2 text-sm">
                  <AppRow name="solana-client" desc="Core Solana utilities" />
                  <AppRow name="solana-client-react" desc="React hooks for Solana" />
                  <AppRow name="wallet-standard" desc="Wallet Standard impl" />
                  <AppRow name="background" desc="Signing service" />
                  <AppRow name="keypair" desc="Key generation/derivation" />
                  <AppRow name="db" desc="Account persistence" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solana Client */}
        <section className="space-y-8">
          <SectionHeader icon="🔌" title="Solana Client" subtitle="Core RPC and transaction utilities" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Creating the Client</h3>
            <CodeBlock code={`import { createSolanaClient } from '@samui/solana-client'

const client = createSolanaClient({
  url: 'https://api.devnet.solana.com',
  urlSubscriptions: 'wss://api.devnet.solana.com'
})

// Returns: { rpc, rpcSubscriptions }
// - rpc: For queries and sending transactions
// - rpcSubscriptions: For real-time updates`} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Query Functions</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><code className="text-emerald-600 dark:text-emerald-400">getBalance()</code> - SOL balance in lamports</li>
                <li><code className="text-emerald-600 dark:text-emerald-400">getAccountInfo()</code> - Account data</li>
                <li><code className="text-emerald-600 dark:text-emerald-400">getActivity()</code> - Transaction history</li>
                <li><code className="text-emerald-600 dark:text-emerald-400">getTokenAccounts()</code> - SPL token accounts</li>
                <li><code className="text-emerald-600 dark:text-emerald-400">getLatestBlockhash()</code> - Current blockhash</li>
                <li><code className="text-emerald-600 dark:text-emerald-400">requestAirdrop()</code> - Devnet SOL</li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Transaction Functions</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><code className="text-emerald-600 dark:text-emerald-400">createSolTransferTransaction()</code></li>
                <li><code className="text-emerald-600 dark:text-emerald-400">createAndSendSolTransaction()</code></li>
                <li><code className="text-emerald-600 dark:text-emerald-400">createSplTransferTransaction()</code></li>
                <li><code className="text-emerald-600 dark:text-emerald-400">createAndSendSplTransaction()</code></li>
                <li><code className="text-emerald-600 dark:text-emerald-400">splTokenCreateTokenMint()</code></li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Conversion Utilities</h3>
            <CodeBlock code={`import { lamportsToSol, solToLamports, uiAmountToBigInt } from '@samui/solana-client'

// SOL conversions
lamportsToSol(1_500_000_000n)  // → "1.5 SOL"
solToLamports("1.5")           // → 1500000000n (Lamports type)

// Token conversions (handles decimals)
uiAmountToBigInt("100.5", 6)   // → 100500000n (6 decimal places)

// Fee-aware max calculation
maxAvailableSolAmount(balance, requested)  // Subtracts 5000 lamports for fee`} />
          </div>
        </section>

        {/* React Hooks */}
        <section className="space-y-8">
          <SectionHeader icon="⚛️" title="React Hooks" subtitle="TanStack Query integration" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Available Hooks</h3>
            <CodeBlock code={`import {
  useSolanaClient,
  useGetBalance,
  useGetActivity,
  useGetTokenAccounts,
  useGetAccountInfo,
  useRequestAirdrop,
  useSplTokenCreateTokenMint
} from '@samui/solana-client-react'

// Create client for a network
const client = useSolanaClient({ network: 'solana:devnet' })

// Query balance (auto-caches with React Query)
const { data: balance, isLoading } = useGetBalance({
  address: 'So11111111111111111111111111111111111111112',
  network: 'solana:devnet'
})

// Query token accounts
const { data: tokens } = useGetTokenAccounts({
  address: walletAddress,
  network: 'solana:devnet'
})`} />
          </div>
        </section>

        {/* Wallet Connection */}
        <section className="space-y-8">
          <SectionHeader icon="🔗" title="Wallet Connection" subtitle="Wallet Standard protocol" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Connection Flow</h3>
            <div className="space-y-4">
              <FlowStep step={1} title="Discover Wallets" code={`import { useWallets } from '@wallet-standard/react'
const wallets = useWallets().filter(w =>
  w.chains.some(chain => chain.startsWith('solana:'))
)`} />
              <FlowStep step={2} title="Connect" code={`import { StandardConnect, getWalletFeature } from '@wallet-standard/core'

const { connect } = getWalletFeature(wallet, StandardConnect)
const { accounts } = await connect()
// accounts: WalletAccount[] with address, publicKey`} />
              <FlowStep step={3} title="Get Signer" code={`import { useWalletAccountTransactionSendingSigner } from '@solana/react'

const signer = useWalletAccountTransactionSendingSigner(
  account,
  'solana:devnet'
)`} />
              <FlowStep step={4} title="Disconnect" code={`const { disconnect } = getWalletFeature(wallet, StandardDisconnect)
await disconnect()`} />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Wallet Standard Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <FeatureCard name="StandardConnect" desc="Connect and get accounts" />
              <FeatureCard name="StandardDisconnect" desc="End session" />
              <FeatureCard name="SolanaSignTransaction" desc="Sign without sending" />
              <FeatureCard name="SolanaSignAndSendTransaction" desc="Sign and broadcast" />
              <FeatureCard name="SolanaSignMessage" desc="Sign arbitrary messages" />
              <FeatureCard name="SolanaSignIn" desc="SIWS protocol" />
            </div>
          </div>
        </section>

        {/* Sending Transactions */}
        <section className="space-y-8">
          <SectionHeader icon="📤" title="Sending Transactions" subtitle="Build, sign, and broadcast" />

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Transaction Pattern</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Uses functional composition with <code className="text-emerald-600 dark:text-emerald-400">pipe()</code> to build transaction messages step by step.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">SOL Transfer Example</h3>
            <CodeBlock code={`import {
  pipe,
  createTransactionMessage,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  appendTransactionMessageInstructions,
  signAndSendTransactionMessageWithSigners
} from '@solana/kit'
import { getTransferSolInstruction } from '@solana-program/system'

async function sendSol(client, sender, destination, amount) {
  // 1. Get current blockhash
  const { value: latestBlockhash } = await client.rpc.getLatestBlockhash().send()

  // 2. Build instruction
  const instruction = getTransferSolInstruction({
    amount: solToLamports(amount),
    source: sender,
    destination
  })

  // 3. Build transaction message
  const message = pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(sender, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => appendTransactionMessageInstructions([instruction], tx),
  )

  // 4. Sign and send
  const signature = await signAndSendTransactionMessageWithSigners(message)
  return signature
}`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">SPL Token Transfer</h3>
            <CodeBlock code={`import { getTransferCheckedInstruction } from '@solana-program/token'
import { findAssociatedTokenPda, getCreateAssociatedTokenInstruction } from '@solana-program/token'

async function sendToken(client, sender, destination, mint, amount, decimals) {
  const { value: latestBlockhash } = await client.rpc.getLatestBlockhash().send()

  // Find Associated Token Accounts
  const [sourceAta] = await findAssociatedTokenPda({ mint, owner: sender.address, tokenProgram })
  const [destAta] = await findAssociatedTokenPda({ mint, owner: destination, tokenProgram })

  const instructions = []

  // Check if destination ATA exists, create if not
  const destAccount = await client.rpc.getAccountInfo(destAta).send()
  if (!destAccount.value) {
    instructions.push(getCreateAssociatedTokenInstruction({
      payer: sender,
      owner: destination,
      mint,
      ata: destAta
    }))
  }

  // Add transfer instruction
  instructions.push(getTransferCheckedInstruction({
    source: sourceAta,
    mint,
    destination: destAta,
    authority: sender,
    amount: uiAmountToBigInt(amount, decimals),
    decimals
  }))

  const message = pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(sender, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => appendTransactionMessageInstructions(instructions, tx),
  )

  return await signAndSendTransactionMessageWithSigners(message)
}`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Using with Connected Wallet</h3>
            <CodeBlock code={`import { useWalletAccountTransactionSendingSigner } from '@solana/react'
import { useWallets } from '@wallet-standard/react'

function SendButton() {
  const [wallet] = useWallets()
  const account = wallet?.accounts[0]
  const client = useSolanaClient({ network: 'solana:devnet' })

  // Get signer from connected wallet
  const signer = useWalletAccountTransactionSendingSigner(
    account,
    'solana:devnet'
  )

  const handleSend = async () => {
    const { value: latestBlockhash } = await client.rpc.getLatestBlockhash().send()

    const instruction = getTransferSolInstruction({
      amount: solToLamports("0.1"),
      source: signer,
      destination: address("RecipientAddress...")
    })

    const message = pipe(
      createTransactionMessage({ version: 0 }),
      (tx) => setTransactionMessageFeePayerSigner(signer, tx),
      (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
      (tx) => appendTransactionMessageInstructions([instruction], tx),
    )

    // This triggers wallet popup for approval
    const signature = await signAndSendTransactionMessageWithSigners(message)
    console.log('Sent!', signature)
  }

  return <button onClick={handleSend}>Send 0.1 SOL</button>
}`} />
          </div>
        </section>

        {/* Token Freezing Concept */}
        <section className="space-y-8">
          <SectionHeader icon="🧊" title="Token Freezing (Conceptual)" subtitle="Time-locked token freezing via program" />

          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-cyan-700 dark:text-cyan-400 mb-2">Note</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Samui Wallet doesn't include token freezing. This shows how you would integrate with a freeze program
              using the same transaction patterns.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Freeze Program Architecture</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Program Accounts</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• <strong>Vault PDA</strong> - Holds frozen tokens</li>
                  <li>• <strong>Freeze Record PDA</strong> - Tracks lock metadata</li>
                  <li>• <strong>User Token Account</strong> - Source/destination ATA</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Record Data</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Owner public key</li>
                  <li>• Mint address</li>
                  <li>• Amount frozen</li>
                  <li>• Unlock timestamp (Unix)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Freeze Tokens Instruction</h3>
            <CodeBlock code={`import { address, getU64Encoder, getAddressEncoder } from '@solana/kit'

const FREEZE_PROGRAM_ID = address('FrzProg111111111111111111111111111111111111')

// Derive PDAs
function getFreezeVaultPda(mint: Address, programId: Address) {
  return getProgramDerivedAddress({
    programAddress: programId,
    seeds: ['vault', getAddressEncoder().encode(mint)]
  })
}

function getFreezeRecordPda(owner: Address, mint: Address, programId: Address) {
  return getProgramDerivedAddress({
    programAddress: programId,
    seeds: [
      'freeze_record',
      getAddressEncoder().encode(owner),
      getAddressEncoder().encode(mint)
    ]
  })
}

// Build freeze instruction
function getFreezeTokensInstruction({
  owner,           // TransactionSigner
  mint,            // Address
  userTokenAccount,// Address (owner's ATA)
  amount,          // bigint
  duration,        // number (seconds)
}: FreezeParams) {
  const [vault] = getFreezeVaultPda(mint, FREEZE_PROGRAM_ID)
  const [freezeRecord] = getFreezeRecordPda(owner.address, mint, FREEZE_PROGRAM_ID)
  const unlockTime = BigInt(Math.floor(Date.now() / 1000) + duration)

  // Instruction discriminator (first 8 bytes of sha256("global:freeze_tokens"))
  const discriminator = new Uint8Array([/* 8 bytes */])

  // Encode instruction data
  const data = new Uint8Array([
    ...discriminator,
    ...getU64Encoder().encode(amount),
    ...getU64Encoder().encode(unlockTime)
  ])

  return {
    programAddress: FREEZE_PROGRAM_ID,
    accounts: [
      { address: owner.address, role: AccountRole.WRITABLE_SIGNER },
      { address: mint, role: AccountRole.READONLY },
      { address: userTokenAccount, role: AccountRole.WRITABLE },
      { address: vault, role: AccountRole.WRITABLE },
      { address: freezeRecord, role: AccountRole.WRITABLE },
      { address: TOKEN_PROGRAM_ADDRESS, role: AccountRole.READONLY },
      { address: SYSTEM_PROGRAM_ADDRESS, role: AccountRole.READONLY },
    ],
    data
  }
}`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Complete Freeze Transaction</h3>
            <CodeBlock code={`async function freezeTokens(
  client: SolanaClient,
  signer: TransactionSigner,
  mint: Address,
  amount: string,
  durationDays: number
) {
  const { value: latestBlockhash } = await client.rpc.getLatestBlockhash().send()

  // Find user's token account
  const [userAta] = await findAssociatedTokenPda({
    mint,
    owner: signer.address,
    tokenProgram: TOKEN_PROGRAM_ADDRESS
  })

  // Build freeze instruction
  const freezeIx = getFreezeTokensInstruction({
    owner: signer,
    mint,
    userTokenAccount: userAta,
    amount: uiAmountToBigInt(amount, 9), // assuming 9 decimals
    duration: durationDays * 24 * 60 * 60 // days to seconds
  })

  const message = pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(signer, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => appendTransactionMessageInstructions([freezeIx], tx),
  )

  return await signAndSendTransactionMessageWithSigners(message)
}`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Unfreeze Tokens (After Lock Period)</h3>
            <CodeBlock code={`function getUnfreezeTokensInstruction({
  owner,
  mint,
  userTokenAccount,
}: UnfreezeParams) {
  const [vault] = getFreezeVaultPda(mint, FREEZE_PROGRAM_ID)
  const [freezeRecord] = getFreezeRecordPda(owner.address, mint, FREEZE_PROGRAM_ID)

  // Discriminator for unfreeze instruction
  const discriminator = new Uint8Array([/* 8 bytes */])

  return {
    programAddress: FREEZE_PROGRAM_ID,
    accounts: [
      { address: owner.address, role: AccountRole.WRITABLE_SIGNER },
      { address: mint, role: AccountRole.READONLY },
      { address: userTokenAccount, role: AccountRole.WRITABLE },
      { address: vault, role: AccountRole.WRITABLE },
      { address: freezeRecord, role: AccountRole.WRITABLE },
      { address: TOKEN_PROGRAM_ADDRESS, role: AccountRole.READONLY },
    ],
    data: discriminator
  }
}

async function unfreezeTokens(client, signer, mint) {
  const { value: latestBlockhash } = await client.rpc.getLatestBlockhash().send()

  const [userAta] = await findAssociatedTokenPda({
    mint,
    owner: signer.address,
    tokenProgram: TOKEN_PROGRAM_ADDRESS
  })

  const unfreezeIx = getUnfreezeTokensInstruction({
    owner: signer,
    mint,
    userTokenAccount: userAta,
  })

  const message = pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(signer, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => appendTransactionMessageInstructions([unfreezeIx], tx),
  )

  // Will fail on-chain if unlock time hasn't passed
  return await signAndSendTransactionMessageWithSigners(message)
}`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">React Hook for Freezing</h3>
            <CodeBlock code={`import { useMutation, useQueryClient } from '@tanstack/react-query'

function useFreezeTokens() {
  const client = useSolanaClient({ network: 'solana:devnet' })
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      signer,
      mint,
      amount,
      durationDays
    }: {
      signer: TransactionSigner
      mint: Address
      amount: string
      durationDays: number
    }) => {
      const signature = await freezeTokens(client, signer, mint, amount, durationDays)
      return signature
    },
    onSuccess: (_, { signer }) => {
      // Invalidate token balance queries
      queryClient.invalidateQueries({ queryKey: ['getTokenAccounts', signer.address] })
    }
  })
}

// Usage in component
function FreezeButton({ mint }: { mint: Address }) {
  const signer = useWalletAccountTransactionSendingSigner(account, 'solana:devnet')
  const { mutate: freeze, isPending } = useFreezeTokens()

  return (
    <button
      onClick={() => freeze({
        signer,
        mint,
        amount: "100",
        durationDays: 30
      })}
      disabled={isPending}
    >
      {isPending ? 'Freezing...' : 'Freeze 100 tokens for 30 days'}
    </button>
  )
}`} />
          </div>
        </section>

        {/* Keypair Management */}
        <section className="space-y-8">
          <SectionHeader icon="🔑" title="Keypair Management" subtitle="Key generation and derivation" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">BIP44 Derivation</h3>
            <CodeBlock code={`import {
  generateMnemonic,
  createKeyPairSignerFromBip44,
  validateMnemonic
} from '@samui/keypair'

// Generate new mnemonic (12 or 24 words)
const mnemonic = generateMnemonic({ strength: 128 }) // 12 words
// or strength: 256 for 24 words

// Validate mnemonic
const isValid = validateMnemonic(mnemonic)

// Derive multiple accounts
const signers = await createKeyPairSignerFromBip44({
  mnemonic,
  from: 0,
  to: 10, // Derive 10 accounts
  // derivationPath defaults to Solana: m/44'/501'/i'/0'
})

// Each signer has .address and can sign transactions`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Key Serialization</h3>
            <CodeBlock code={`import {
  convertKeyPairToJson,
  createKeyPairSignerFromJson,
  createKeyPairFromBase58
} from '@samui/keypair'

// Serialize for storage
const json = convertKeyPairToJson(keyPair)
// Store json in DB...

// Restore from storage
const signer = await createKeyPairSignerFromJson(json)

// Import from base58 (Phantom export format)
const imported = await createKeyPairFromBase58(base58PrivateKey)`} />
          </div>
        </section>

        {/* Network Configuration */}
        <section className="space-y-8">
          <SectionHeader icon="🌐" title="Network Configuration" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Supported Networks</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <NetworkCard
                name="Devnet"
                chain="solana:devnet"
                url="https://api.devnet.solana.com"
              />
              <NetworkCard
                name="Testnet"
                chain="solana:testnet"
                url="https://api.testnet.solana.com"
              />
              <NetworkCard
                name="Mainnet"
                chain="solana:mainnet"
                url="https://api.mainnet-beta.solana.com"
              />
              <NetworkCard
                name="Localnet"
                chain="solana:localnet"
                url="http://localhost:8899"
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Explorer URLs</h3>
            <CodeBlock code={`import { getExplorerUrl } from '@samui/solana-client'

// Generate explorer links
getExplorerUrl('address', pubkey, 'solana:devnet', 'solana-explorer')
getExplorerUrl('transaction', signature, 'solana:mainnet', 'solscan')
getExplorerUrl('block', slot, 'solana:devnet', 'helius-orb')

// Supported explorers: 'solana-explorer' | 'solscan' | 'helius-orb'`} />
          </div>
        </section>

        {/* Constants */}
        <section className="space-y-8">
          <SectionHeader icon="📋" title="Important Constants" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Values</h3>
                <div className="space-y-2 text-sm">
                  <ConstRow name="TRANSACTION_FEE" value="5000 lamports" />
                  <ConstRow name="LAMPORTS_PER_SOL" value="1,000,000,000" />
                  <ConstRow name="Derivation Path" value="m/44'/501'/i'/0'" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Addresses</h3>
                <div className="space-y-2 text-sm">
                  <ConstRow name="Native Mint (wSOL)" value="So111...1112" />
                  <ConstRow name="Token Program" value="Token...1111" />
                  <ConstRow name="Token-2022" value="Token...2022" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-8">
          <SectionHeader icon="💡" title="Key Takeaways" />

          <div className="grid md:grid-cols-2 gap-6">
            <TakeawayCard
              title="Wallet Standard first"
              description="Uses @wallet-standard/core for universal wallet compatibility. Any Wallet Standard wallet works."
            />
            <TakeawayCard
              title="Functional transaction building"
              description="pipe() composition creates readable, maintainable transaction construction. Each step transforms the message."
            />
            <TakeawayCard
              title="Both token programs"
              description="Supports SPL Token and Token-2022. Queries both programs when fetching token accounts."
            />
            <TakeawayCard
              title="React Query integration"
              description="All hooks use TanStack Query for caching, refetching, and query invalidation after mutations."
            />
          </div>
        </section>
      </main>
    </div>
  )
}

// Components

function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="text-slate-500">{subtitle}</p>}
      </div>
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto text-sm">
      <code className="text-slate-700 dark:text-slate-300">{code}</code>
    </pre>
  )
}

function AppRow({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="flex justify-between">
      <code className="text-emerald-600 dark:text-emerald-400 text-xs">{name}</code>
      <span className="text-slate-500 text-xs">{desc}</span>
    </div>
  )
}

function FeatureCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
      <code className="text-emerald-600 dark:text-emerald-400 text-sm">{name}</code>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  )
}

function FlowStep({ step, title, code }: { step: number; title: string; code: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-semibold">
          {step}
        </span>
        <span className="font-semibold text-sm">{title}</span>
      </div>
      <div className="ml-9">
        <CodeBlock code={code} />
      </div>
    </div>
  )
}

function NetworkCard({ name, chain, url }: { name: string; chain: string; url: string }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
      <div className="font-semibold text-slate-800 dark:text-slate-200">{name}</div>
      <code className="text-xs text-emerald-600 dark:text-emerald-400">{chain}</code>
      <div className="text-xs text-slate-500 mt-1 truncate">{url}</div>
    </div>
  )
}

function ConstRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-600 dark:text-slate-400">{name}</span>
      <code className="text-emerald-600 dark:text-emerald-400 text-xs">{value}</code>
    </div>
  )
}

function TakeawayCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}
