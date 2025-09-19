'use client'

import {
    Anchor,
    Button,
    Checkbox,
    Divider,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { GrGoogle } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { Flex } from '@mantine/core';
import { FaGithub } from "react-icons/fa";

export function LoginForm(props: PaperProps) {
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    return (
        <Paper radius="md" p="lg" withBorder {...props} className='w-full py-10'>

            <Flex
                mih={50}
                gap="0"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
            >
                <button className='cursor-pointer bg-purple-600 items-center justify-center w-14 h-14 flex rounded-full text-white  -mr-2 z-10 hover:scale-110 transition-transform duration-200'>
                    <GrGoogle />
                </button>
                <button className='cursor-pointer bg-purple-600 items-center justify-center w-14 h-14 flex rounded-full text-white z-20 hover:scale-110 transition-transform duration-200'>
                    <FaFacebook />
                </button>
                <button className='cursor-pointer bg-purple-600 items-center justify-center w-14 h-14 flex rounded-full text-white  -ml-2 z-10 hover:scale-110 transition-transform duration-200'>
                    <FaGithub />
                </button>
            </Flex>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />

            <form
                onSubmit={form.onSubmit(() => { })}
                className='text-left'
            >
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            label="Name"
                            placeholder="Your name"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />

                    {type === 'register' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    )}
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl" color="#9810FA">
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    )
}