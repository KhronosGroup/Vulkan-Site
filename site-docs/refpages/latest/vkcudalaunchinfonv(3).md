# VkCudaLaunchInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCudaLaunchInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCudaLaunchInfoNV - Structure specifying the parameters to launch a CUDA kernel

The `VkCudaLaunchInfoNV` structure is very close to the parameters of
the CUDA-Driver function
[cuLaunchKernel](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__EXEC.html#group__CUDA__EXEC_1gb8f3dc3031b40da29d5f9a7139e52e15)
documented in section
[6.19
Execution Control](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__EXEC.html#group__CUDA__EXEC) of CUDA Driver API.

The structure is defined as:

// Provided by VK_NV_cuda_kernel_launch
typedef struct VkCudaLaunchInfoNV {
    VkStructureType        sType;
    const void*            pNext;
    VkCudaFunctionNV       function;
    uint32_t               gridDimX;
    uint32_t               gridDimY;
    uint32_t               gridDimZ;
    uint32_t               blockDimX;
    uint32_t               blockDimY;
    uint32_t               blockDimZ;
    uint32_t               sharedMemBytes;
    size_t                 paramCount;
    const void* const *    pParams;
    size_t                 extraCount;
    const void* const *    pExtras;
} VkCudaLaunchInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`function` is the CUDA-Driver handle to the function being launched.

* 
`gridDimX` is the number of local workgroups to dispatch in the X
dimension.
It **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]

* 
`gridDimY` is the number of local workgroups to dispatch in the Y
dimension.
It **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]

* 
`gridDimZ` is the number of local workgroups to dispatch in the Z
dimension.
It **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]

* 
`blockDimX` is block size in the X dimension.

* 
`blockDimY` is block size in the Y dimension.

* 
`blockDimZ` is block size in the Z dimension.

* 
`sharedMemBytes` is the dynamic shared-memory size per thread block
in bytes.

* 
`paramCount` is the length of the `pParams` table.

* 
`pParams` is a pointer to an array of `paramCount` pointers,
corresponding to the arguments of `function`.

* 
`extraCount` is reserved for future use.

* 
`pExtras` is reserved for future use.

Kernel parameters of `function` are specified via `pParams`, very
much the same way as described in
[cuLaunchKernel](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__EXEC.html#group__CUDA__EXEC_1gb8f3dc3031b40da29d5f9a7139e52e15)

If `function` has N parameters, then `pParams` **must** be an array of
N pointers and `paramCount` **must** be N. Each of `kernelParams`[0]
through `kernelParams`[N-1] **must** point to a region of memory from which
the actual kernel parameter will be copied.
The number of kernel parameters and their offsets and sizes are not
specified here as that information is stored in the [VkCudaFunctionNV](VkCudaFunctionNV.html)
object.

The application-owned memory pointed to by `pParams` and
`kernelParams`[0] through `kernelParams`[N-1] are consumed
immediately, and **may** be altered or freed after
[vkCmdCudaLaunchKernelNV](vkCmdCudaLaunchKernelNV.html) has returned.

Valid Usage

* 
[](#VUID-VkCudaLaunchInfoNV-gridDimX-09406) VUID-VkCudaLaunchInfoNV-gridDimX-09406

`gridDimX` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]

* 
[](#VUID-VkCudaLaunchInfoNV-gridDimY-09407) VUID-VkCudaLaunchInfoNV-gridDimY-09407

`gridDimY` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]

* 
[](#VUID-VkCudaLaunchInfoNV-gridDimZ-09408) VUID-VkCudaLaunchInfoNV-gridDimZ-09408

`gridDimZ` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]

* 
[](#VUID-VkCudaLaunchInfoNV-paramCount-09409) VUID-VkCudaLaunchInfoNV-paramCount-09409

`paramCount` **must** be the total amount of parameters listed in the
`pParams` table

* 
[](#VUID-VkCudaLaunchInfoNV-pParams-09410) VUID-VkCudaLaunchInfoNV-pParams-09410

`pParams` **must** be a pointer to a table of `paramCount`
parameters, corresponding to the arguments of `function`

* 
[](#VUID-VkCudaLaunchInfoNV-extraCount-09411) VUID-VkCudaLaunchInfoNV-extraCount-09411

`extraCount` **must** be 0

* 
[](#VUID-VkCudaLaunchInfoNV-pExtras-09412) VUID-VkCudaLaunchInfoNV-pExtras-09412

`pExtras` **must** be NULL

Valid Usage (Implicit)

* 
[](#VUID-VkCudaLaunchInfoNV-sType-sType) VUID-VkCudaLaunchInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CUDA_LAUNCH_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkCudaLaunchInfoNV-pNext-pNext) VUID-VkCudaLaunchInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCudaLaunchInfoNV-function-parameter) VUID-VkCudaLaunchInfoNV-function-parameter

 `function` **must** be a valid [VkCudaFunctionNV](VkCudaFunctionNV.html) handle

[VK_NV_cuda_kernel_launch](VK_NV_cuda_kernel_launch.html), [VkCudaFunctionNV](VkCudaFunctionNV.html), [VkStructureType](VkStructureType.html), [vkCmdCudaLaunchKernelNV](vkCmdCudaLaunchKernelNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/dispatch.html#VkCudaLaunchInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
