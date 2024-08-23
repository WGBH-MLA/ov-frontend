#!/usr/bin/env python3
from re import split
from subprocess import run as sub_run

from loguru import logger as log
from typer import Context, Option, Typer
from typer.core import TyperGroup
from typer.main import get_group


def run(cmd: str):
    sub_run(cmd, shell=True, check=True)


class AliasGroup(TyperGroup):
    """Create an alias for a command.

    Blatenly stolen from: https://github.com/tiangolo/typer/issues/132#issuecomment-1714516903
    """

    _CMD_SPLIT_P = r'[,| ?\/]'

    def get_command(self, ctx, cmd_name):
        cmd_name = self._group_cmd_name(cmd_name)
        return super().get_command(ctx, cmd_name)

    def _group_cmd_name(self, default_name):
        for cmd in self.commands.values():
            if cmd.name and default_name in split(self._CMD_SPLIT_P, cmd.name):
                return cmd.name
        return default_name


app = Typer(cls=AliasGroup, context_settings={'help_option_names': ['-h', '--help']})


@app.command('b | build')
def build():
    """Build the docker image"""
    run('docker build -t ov-front --target dev .')


@app.command('d | dev')
def coverage():
    """Run the dev server"""
    run(
        'docker run --rm -it -v $PWD:/app -p 3000:3000 -e OV_API_URL="http://host.docker.internal:8000" -e SECRET="super secret" ov-front sh'
    )


@app.command('p | prod')
def production():
    """Run the production server"""
    run(
        'docker run --rm -it -p 3000:3000 -e OV_API_URL="http://host.docker.internal:8000" -e SECRET="super secret" ov-front'
    )


@app.command('t | tui')
def terminal_ui(ctx: Context):
    """Run an interactive TUI"""
    try:
        from trogon import Trogon
    except ImportError:
        log.error('Please install the `trogon` package to use the TUI.')
        return
    Trogon(get_group(app), click_context=ctx).run()


@app.callback()
def main(
    ctx: Context,
    verbose: bool = Option(None, '--verbose', '-v', help='Show verbose output.'),
):
    if not verbose:
        log.remove()


if __name__ == '__main__':
    app()
