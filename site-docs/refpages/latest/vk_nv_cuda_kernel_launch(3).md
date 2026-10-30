# VK_NV_cuda_kernel_launch(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_cuda_kernel_launch.html

## Table of Contents

- [Name](#_name)
- [VK_NV_cuda_kernel_launch](#VK_NV_cuda_kernel_launch)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_cuda_kernel_launch - device extension

**Name String**

`VK_NV_cuda_kernel_launch`

**Extension Type**

Device extension

**Registered Extension Number**

308

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

* 
**This is a *provisional* extension and must** be used with caution.
See the [description](../../../../spec/latest/appendices/boilerplate.html#boilerplate-provisional-header) of provisional header files for enablement and stability details.

**API Interactions**

* 
Interacts with VK_EXT_debug_report

**Contact**

* 
Tristan Lorach [tlorach](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_cuda_kernel_launch] @tlorach%0A*Here describe the issue or question you have about the VK_NV_cuda_kernel_launch extension*)

**Last Modified Date**

2020-09-30

**Contributors**

* 
Eric Werness, NVIDIA

Interoperability between APIs can sometimes create additional overhead
depending on the platform used.
This extension targets deployment of existing CUDA kernels via Vulkan, with
a way to directly upload PTX kernels and dispatch the kernels from Vulkan’s
command buffer without the need to use interoperability between the Vulkan
and CUDA contexts.
However, we do encourage actual development using the native CUDA runtime
for the purpose of debugging and profiling.

The application will first have to create a CUDA module using
[vkCreateCudaModuleNV](vkCreateCudaModuleNV.html) then create the CUDA function entry point with
[vkCreateCudaFunctionNV](vkCreateCudaFunctionNV.html).

Then in order to dispatch this function, the application will create a
command buffer where it will launch the kernel with
[vkCmdCudaLaunchKernelNV](vkCmdCudaLaunchKernelNV.html).

When done, the application will then destroy the function handle, as well as
the CUDA module handle with [vkDestroyCudaFunctionNV](vkDestroyCudaFunctionNV.html) and
[vkDestroyCudaModuleNV](vkDestroyCudaModuleNV.html).

To reduce the impact of compilation time, this extension offers the
capability to return a binary cache from the PTX that was provided.
For this, a first query for the required cache size is made with
[vkGetCudaModuleCacheNV](vkGetCudaModuleCacheNV.html) with a `NULL` pointer to a buffer and with a
valid pointer receiving the size; then another call of the same function
with a valid pointer to a buffer to retrieve the data.
The resulting cache could then be used later for further runs of this
application by sending this cache instead of the PTX code (using the same
[vkCreateCudaModuleNV](vkCreateCudaModuleNV.html)), thus significantly speeding up the
initialization of the CUDA module.

As with [VkPipelineCache](VkPipelineCache.html), the binary cache depends on the hardware
architecture.
The application must assume the cache might fail, and need to handle falling
back to the original PTX code as necessary.
Most often, the cache will succeed if the same GPU driver and architecture
is used between the cache generation from PTX and the use of this cache.
In the event of a new driver version, or if using a different GPU
architecture, the cache is likely to become invalid.

* 
[VkCudaFunctionNV](VkCudaFunctionNV.html)

* 
[VkCudaModuleNV](VkCudaModuleNV.html)

* 
[vkCmdCudaLaunchKernelNV](vkCmdCudaLaunchKernelNV.html)

* 
[vkCreateCudaFunctionNV](vkCreateCudaFunctionNV.html)

* 
[vkCreateCudaModuleNV](vkCreateCudaModuleNV.html)

* 
[vkDestroyCudaFunctionNV](vkDestroyCudaFunctionNV.html)

* 
[vkDestroyCudaModuleNV](vkDestroyCudaModuleNV.html)

* 
[vkGetCudaModuleCacheNV](vkGetCudaModuleCacheNV.html)

* 
[VkCudaFunctionCreateInfoNV](VkCudaFunctionCreateInfoNV.html)

* 
[VkCudaLaunchInfoNV](VkCudaLaunchInfoNV.html)

* 
[VkCudaModuleCreateInfoNV](VkCudaModuleCreateInfoNV.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCudaKernelLaunchFeaturesNV](VkPhysicalDeviceCudaKernelLaunchFeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceCudaKernelLaunchPropertiesNV](VkPhysicalDeviceCudaKernelLaunchPropertiesNV.html)

* 
`VK_NV_CUDA_KERNEL_LAUNCH_EXTENSION_NAME`

* 
`VK_NV_CUDA_KERNEL_LAUNCH_SPEC_VERSION`

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_CUDA_FUNCTION_NV](VkObjectType.html)

* 
[VK_OBJECT_TYPE_CUDA_MODULE_NV](VkObjectType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_CUDA_FUNCTION_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_CUDA_LAUNCH_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_CUDA_MODULE_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUDA_KERNEL_LAUNCH_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUDA_KERNEL_LAUNCH_PROPERTIES_NV](VkStructureType.html)

If [VK_EXT_debug_report](VK_EXT_debug_report.html) is supported:

* 
Extending [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html):

[VK_DEBUG_REPORT_OBJECT_TYPE_CUDA_FUNCTION_NV_EXT](VkDebugReportObjectTypeEXT.html)

* 
[VK_DEBUG_REPORT_OBJECT_TYPE_CUDA_MODULE_NV_EXT](VkDebugReportObjectTypeEXT.html)

None.

* 
Revision 1, 2020-03-01 (Tristan Lorach)

* 
Revision 2, 2020-09-30 (Tristan Lorach)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_cuda_kernel_launch).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
