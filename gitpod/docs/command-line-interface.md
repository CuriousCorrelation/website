---
section: references
title: Command Line Interface
---

<script context="module">
  export const prerender = true;
</script>

# Command Line Interface

Gitpod supports a command line interface that is available in each workspace terminal called `gp`:

```text
Command line interface for Gitpod

Usage:
  gp [command]

Available Commands:
  env                 Controls user-defined, persistent environment variables.
  help                Help about any command
  init                Create a Gitpod configuration for this project.
  open                Opens a file in Gitpod
  ports               Interact with workspace ports.
  preview             Opens a URL in the IDE's preview
  snapshot            Take a snapshot of the current workspace
  stop                Stop current workspace
  sync-await          Awaits an event triggered using gp sync-done
  sync-done           Notifies the corresponding gp sync-await calls that this event has happened
  tasks               Interact with workspace tasks
  timeout             Interact with workspace timeout configuration
  top                 Display workspace resource (CPU and memory usage)
  url                 Prints the URL of this workspace
  version             Prints the version of the CLI

Flags:
  -h, --help   help for gp

Use "gp [command] --help" for more information about a command.
```

## init

Gitpod workspaces can be configured - see [Configuring Workspaces](/docs/configure) for more details. `gp init` generates a default `.gitpod.yml` file. You can customize it to match your requirements.

Alternatively, `gp init -i` is an interactive guide which helps create the `.gitpod.yml` configuration file based on a few questions you answer.

## open

Modern editors/IDE's support command line tooling to open a file (e.g. VS Code `code foo.txt`). In Gitpod, this can be done using `gp open <filename>`.
We also added common aliases for `gp open`: `code` and `open`.

## preview

`gp preview` is similar to `gp open`, except that it does not open a file in the editor but a URL in a preview pane on the right.

Make sure you provide a valid URL, i.e. including the protocol. For example, http://localhost:8080.

## url

Gitpod workspaces can expose services to the internet. `gp url` provides the URL which points to a service served from a Gitpod workspace. For example `gp url 8080` prints the URL which points to the service listening on port 8080 in this current workspace.

You can combine the `preview` and the `url` command to open a certain path instead of the default URL.

For instance:

```sh
gp preview $(gp url 3000)/my/path/index.html
```

If you put this into the `.gitpod.yml` to open the a certain page on startup, make sure you [ignore the default action](/docs/config-ports) when the port opens.

## env

With `gp env API_ENDPOINT=https://api.example.com` you can set an `API_ENDPOINT` environment variable that is accessible for this project, even if you stop the workspace and start a new one.

To delete or unset an environment variable, you use `gp env -u API_ENDPOINT`.

Please refer to the help output provided by `gp env --help` for more use cases of the `gp env` command.

## sync-await

In situations where you work with multiple terminals and one depends on a task in another terminal to complete, `gp sync-await <name>` waits until you call `gp sync-done <name>` in another terminal.

See [Start Tasks](/docs/config-start-tasks#wait-for-commands-to-complete) for a real-world example.

## sync-done

To notify a `gp sync-await <name>` call (see previous chapter), you can call `gp sync-done <name>`.

A common use case is the following where we have three terminals:

- Terminal 1: A build process takes several minutes to complete. At the end, you call `gp sync-done build`.
- Terminal 2: You use `gp sync-await build && npm run start-database` to wait for the build to complete before you start a database
- Terminal 3: You use `gp sync-await build && npm run dev` to wait for the build to complete before you start the dev server.

See [Start Tasks](/docs/config-start-tasks#wait-for-commands-to-complete) for a real-world example.

## snapshot

For sharing a complete clone of a workspace with others, `gp snapshot` is basically the CLI method for getting a snapshot URL. To learn more about snapshots, see [Collaboration & Sharing of Workspaces](/docs/sharing-and-collaboration#sharing-snapshots)

## stop

`gp stop` is the CLI method of stopping a workspace.

## tasks

Programmatically view and interact with workspace tasks as defined in the project's [.gitpod.yml](/docs/references/gitpod-yml). Useful when using the command line, such as ssh'ing into a workspace or after accidentally losing view of a terminal and it's output.

### list

Returns a table-formatted list of tasks, their name, state and the ID of the terminal in which the task is executed.

```sh
gp tasks list
```

### attach

Creates a connection from a user terminal to a given workspace's task terminal. The session is interactive. Once attached, both stdin and stdout are streamed between the user and the remote terminal. Allowing the user to run commands directly in the task terminal.

Run without arguments to get a selection prompt. When only one task is running, attach will skip the prompt and automatically connect.

```sh
gp tasks attach
```

Alternatively, specify the `Terminal ID` that you can see with `gp tasks list`:

```sh
gp tasks attach <id>
```

## timeout

Interact with workspace timeout configuration. You can learn more in [Life of a Workspace](/docs/life-of-workspace#timeouts).

### extend

Extends the current workspace's timeout.

> **Note:** You can only have one workspace with extended timeout at a time.

The default timeout, and the ability to extend a workspace timeout depends on your [plan](https://gitpod.io/plans) or [team plan](https://gitpod.io/teams).

## ports

Provides a way to manage a workspace's ports. Applies to both: ports defined in [.gitpod.yml](/docs/references/gitpod-yml) and ports that are undeclared but are opened during the lifetime of the workspace.

### list

Outputs a table-formatted list of ports along with their status, URL, name and description.

```sh
gp ports list
```

### top

Displays the used and available workspace CPU and memory.

### expose

In Gitpod, services/servers running on a port need to be _exposed_ before they become accessible from the internet. This process only works with services listening on `0.0.0.0` and not just `localhost`.
Sometimes it is not possible to make a server listen on `0.0.0.0`, e.g. because it is not your code and there are simply no means of configuration.

In that case, `gp ports expose <port>` can be used to forward all traffic form a socket listing on all network interfaces to your process listening on localhost only.

```sh
gp ports expose <port>
```

### await

When writing tasks to be executed on workspace start, one sometimes wants to wait for an http service to be available. `gp ports await` does that.

Here's an example that will open a certain path once a service is a available:

```sh
gp ports await 3000 && gp preview $(gp url 3000)/my/path/index.html
```
