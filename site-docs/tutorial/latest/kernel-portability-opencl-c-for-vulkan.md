# Kernel Portability: OpenCL C for Vulkan

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/05_OpenCL_on_Vulkan/04_kernel_portability.html

## Table of Contents

- [Adapting OpenCL C for Vulkan](#_adapting_opencl_c_for_vulkan)
- [Adapting_OpenCL_C_for_Vulkan](#_adapting_opencl_c_for_vulkan)
- [Avoiding Physical Pointers](#_avoiding_physical_pointers)
- [Avoiding_Physical_Pointers](#_avoiding_physical_pointers)
- [Understanding Synchronization](#_understanding_synchronization)
- [Built-in Variables](#_built_in_variables)
- [Porting Millions of Lines of Code](#_porting_millions_of_lines_of_code)
- [Porting_Millions_of_Lines_of_Code](#_porting_millions_of_lines_of_code)

## Content

While `clspv` can translate most OpenCL C kernels, not every feature is supported out-of-the-box. To ensure your kernels run correctly on Vulkan, you may need to adopt a "Vulkan-flavored" style of OpenCL C.

This isn’t about rewriting your logic, but rather about being mindful of the differences between the OpenCL and Vulkan memory and execution models.

OpenCL C allows you to treat memory like a single, flat address space. Vulkan, however, separates memory into different types (Storage Buffers, Uniform Buffers, LDS, etc.).

When writing kernels for the `clspv` pipeline:

* 
**Favor Buffers**: Use `__global` pointers for large data arrays and map them to Vulkan Storage Buffers.

* 
**Be Explicit**: Clearly mark your pointer types (e.g., `*global*`*, ``*`local`, `__constant`) so `clspv` can map them to the correct Vulkan memory regions.

* 
**Avoid Pointer Arithmetic**: While `VK_KHR_variable_pointers` makes arithmetic possible, it can be slow on older hardware. Use array-style indexing (`p[i]`) instead of pointer increments (`*(p + i)`) whenever possible.

OpenCL’s `barrier()` is very similar to Vulkan’s `control_barrier`. However, Vulkan is much more explicit about **Memory Consistency** (as we discussed in Chapter 3).

When porting a kernel:

**Check Your Scopes**: OpenCL’s `CLK_LOCAL_MEM_FENCE` and `CLK_GLOBAL_MEM_FENCE` correspond to Vulkan’s `Workgroup` and `Device` memory scopes.

**Domain Operations**: Ensure that any data shared between workgroups is handled via atomic operations or explicit memory barriers that include the correct memory visibility flags.

In OpenCL C, you use functions like `get_global_id()` and `get_local_id()`. `clspv` automatically maps these to the equivalent Vulkan built-ins:

* 
`get_global_id(0)` maps to `gl_GlobalInvocationID.x` (or `SV_DispatchThreadID.x` in Slang)

* 
`get_local_id(0)` maps to `gl_LocalInvocationID.x` (or `SV_GroupThreadID.x` in Slang)

* 
`get_group_id(0)` maps to `gl_WorkGroupID.x` (or `SV_GroupID.x` in Slang)

Because of this direct mapping, your kernel’s indexing logic should remain identical.

The real power of this pipeline is its ability to handle legacy code. Many production-grade libraries (like OpenCV or custom physics engines) contain thousands of OpenCL kernels. By following these simple portability guidelines, you can bring these libraries to Vulkan with minimal effort.

In the next section, we’ll explore **clvk**, which takes this a step further by providing a full OpenCL 3.0 API implementation on top of Vulkan.

[Previous: The clspv Pipeline](03_clspv_pipeline.html) | [Next: clvk and Layering](05_clvk_and_layering.html)
