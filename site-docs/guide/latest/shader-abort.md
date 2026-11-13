# Shader Abort

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/shader_abort.html

## Table of Contents

- [The dependency extensions](#_the_dependency_extensions)
- [The_dependency_extensions](#_the_dependency_extensions)
- [What happens when a shader aborts](#_what_happens_when_a_shader_aborts)
- [What_happens_when_a_shader_aborts](#_what_happens_when_a_shader_aborts)
- [The message format](#_the_message_format)
- [The_message_format](#_the_message_format)
- [The common printf style](#_the_common_printf_style)
- [The_common_printf_style](#_the_common_printf_style)
- [The data can be anything](#_the_data_can_be_anything)
- [The_data_can_be_anything](#_the_data_can_be_anything)
- [Retrieving the message](#_retrieving_the_message)
- [Retrieving_the_message](#_retrieving_the_message)

## Content

This chapter covers [VK_KHR_shader_abort](https://docs.vulkan.org/features/latest/features/proposals/VK_KHR_shader_abort.html)

`VK_KHR_shader_abort` provides a GPU style `assert()` to help debug your shaders with simple setup.

The core idea is the new `OpAbortKHR` instruction, when executed, will stop the shader (and cause a device lost) and send back the data from the abort message to be examined on the host side.

This extension was released with 2 other extensions that it depends on:

* 
`VK_KHR_shader_constant_data` (`SPV_KHR_constant_data`)

This allows large (string) constants in a shader.

* 
A shader only needs the capability if it uses constant data, which glslang does for the message string.

`VK_KHR_device_fault`

* 
How the application reads the message after the device is lost.

|  | Some shader toolchains (glslang) use an 8-bit integer for the characters of the message string, which means the shader also declares the `Int8` capability and needs the `shaderInt8` feature. |
| --- | --- |

When an invocation executes `OpAbortKHR`:

That invocation stops at that point. Only instructions before it have had any side effect.

Other invocations are **not** stopped instantly. The implementation has to stop them in "finite time", so some of them can run to completion and some of them can abort as well.

The `VkDevice` is lost and calls will start returning `VK_ERROR_DEVICE_LOST` (**Note:** the spec requires the driver to report device lost on an abort).

The application uses `vkGetDeviceFaultDebugInfoKHR` to get the message.

Because other invocations may keep running for a little while, more than one of them may reach an abort before the device is shut down.

The implementation is only required to report the message from the first abort that was executed. It may report more of them, but it is not required to. This means an application should be able to handle receiving one message or many, but should never expect to see all of them.

When the abort occurs the driver sends back the data in `VkDeviceFaultShaderAbortMessageInfoKHR::pMessageData` which is a series of `(size, payload)` messages.

In this example `VkDeviceFaultShaderAbortMessageInfoKHR::messageDataSize == 64` and there are 3 messages inside.

![shader_abort_message_layout_base.svg](_images/shader_abort_message_layout_base.svg)

Some things to note:

* 
`size` is a 64-bit unsigned integer, the size of the `payload` in bytes (not counting any padding after it).

* 
`payload` is the exact bytes of the **Message**, laid out as the **Message Type** in the `OpAbortKHR` instruction.

* 
Each pair starts on an 8-byte aligned offset, so there can be some padding after a payload.

Both glslang and Slang provide a working `printf` style abort as of Vulkan SDK 1.4.363.0.

// glsl
#extension GL_EXT_abort : require
abortEXT("bad index: %u", index);

// slang
abort("bad index: %u", index);

![shader_abort_message_layout_simple.svg](_images/shader_abort_message_layout_simple.svg)

It is **important to understand** that the driver sends the data back to `pMessageData` **without modifying it**. This means the idea of `printf` is just a convention and doesn’t actually have to be followed to use `VK_KHR_shader_abort`.

While glslang and Slang don’t provide a way to do this, it would not be hard to inject your own `OpAbortKHR` that would look like this (pseudo code):

float myFloat;
void* myPointer;

abort(42, myFloat, myPointer);

![shader_abort_message_layout_advance.svg](_images/shader_abort_message_layout_advance.svg)

This would just require the application to know that layout when it decodes the message.

After detecting `VK_ERROR_DEVICE_LOST`, chain `VkDeviceFaultShaderAbortMessageInfoKHR` into `VkDeviceFaultDebugInfoKHR` and call `vkGetDeviceFaultDebugInfoKHR`. As with other "get the size, then get the data" calls, it is called twice.

VkDeviceFaultShaderAbortMessageInfoKHR abort_info = {};

VkDeviceFaultDebugInfoKHR debug_info = {};
debug_info.pNext = &abort_info;

// 1st call: pMessageData is NULL, so messageDataSize is filled in with the size needed
vkGetDeviceFaultDebugInfoKHR(device, &debug_info);

// Not every device loss comes from a shader abort
// so it is expected that messageDataSize is zero for many of them
if (abort_info.messageDataSize > 0) {
    std::vector data(abort_info.messageDataSize);
    abort_info.pMessageData = data.data();

    // 2nd call: the messages are written to pMessageData
    vkGetDeviceFaultDebugInfoKHR(device, &debug_info);
    // ... decode
}

At this point you might realize you need to implement logic to loop over all the `(size, payload)` pairs in `pMessageData` and also do your own `snprintf` style formatting 🤢🤮

To help developers, there is a nice simple `shader_abort_message.h` helper file at [https://github.com/LunarG/ShaderAbortTools](https://github.com/LunarG/ShaderAbortTools) that will take care of all of this for you!
