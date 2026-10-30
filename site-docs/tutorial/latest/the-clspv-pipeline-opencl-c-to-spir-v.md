# The clspv Pipeline: OpenCL C to SPIR-V

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/05_OpenCL_on_Vulkan/03_clspv_pipeline.html

## Table of Contents

- [What is clspv?](#_what_is_clspv)
- [What_is_clspv?](#_what_is_clspv)
- [The Compilation Flow](#_the_compilation_flow)
- [The_Compilation_Flow](#_the_compilation_flow)
- [Using clspv in Your Workflow](#_using_clspv_in_your_workflow)
- [Using_clspv_in_Your_Workflow](#_using_clspv_in_your_workflow)
- [Key Challenges: Pointers and Memory](#_key_challenges_pointers_and_memory)
- [Key_Challenges:_Pointers_and_Memory](#_key_challenges_pointers_and_memory)
- [Advantages of clspv](#_advantages_of_clspv)
- [Advantages_of_clspv](#_advantages_of_clspv)

## Content

**clspv** is an open-source compiler (part of the Google/Khronos ecosystem) that translates OpenCL C source code into a SPIR-V binary that is specifically designed to run as a Vulkan Compute Shader.

Unlike the standard OpenCL compiler which targets an OpenCL-specific version of SPIR-V, `clspv` performs a complex set of transformations to make the code compatible with Vulkan’s more restrictive memory and execution model.

When you use `clspv`, your kernel goes through several stages:

**Parsing**: The OpenCL C code is parsed using **Clang** (a C-language family front-end for LLVM).

**LLVM Transformation**: The resulting **LLVM IR** (Low-Level Virtual Machine Intermediate Representation, a platform-independent assembly language) is transformed to remove OpenCL-specific features (like physical pointers or certain built-in variables) that don’t exist in Vulkan.

**SPIR-V Generation**: The transformed IR is converted into a Vulkan-flavor SPIR-V.

**Descriptor Mapping**: `clspv` automatically generates a **Descriptor Set Layout** for your kernel. For example, an OpenCL `__global float*` buffer might be mapped to a Vulkan Storage Buffer at `set=0, binding=0`.

The most common way to use `clspv` is as a command-line tool during your build process:

clspv my_kernel.cl -o my_kernel.spv

You can then load `my_kernel.spv` into your Vulkan application just like any other compute shader. However, you need to know how `clspv` mapped your arguments to descriptor bindings. By default, it follows a deterministic mapping based on the order of arguments in your kernel function.

// OpenCL C Kernel
__kernel void MyKernel(__global float* input, __global float* output) {
    // ...
}

In Vulkan, this would typically map to:

* 
`input`: `set=0, binding=0` (Storage Buffer)

* 
`output`: `set=0, binding=1` (Storage Buffer)

One of the biggest hurdles `clspv` solves is **Pointer Support**. OpenCL C allows arbitrary pointer arithmetic, while standard Vulkan does not. `clspv` uses the `VK_KHR_variable_pointers` extension (core in Vulkan 1.1) to emulate this behavior, but it’s much more efficient if you avoid complex pointer-of-pointer math.

Vulkan 1.4’s improved support for **Buffer Device Address** has made this even easier, allowing `clspv` to produce code that is both more portable and higher-performance on modern hardware.

* 
**Ahead-of-Time (AOT)**: You don’t need a heavy OpenCL compiler at runtime; just a small SPIR-V binary.

* 
**Vulkan Integration**: Your OpenCL logic becomes "just another shader" in your existing Vulkan pipeline.

* 
**Performance**: Because it uses the native Vulkan driver, you get the full performance of the hardware without any translation layer overhead at runtime.

In the next section, we’ll look at how to handle **Kernel Portability** and ensure your code runs correctly across different vendors.

[Previous: Setup and Installation](02_setup_and_installation.html) | [Next: Kernel Portability](04_kernel_portability.html)
