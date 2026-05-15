# VK_EXT_pipeline_creation_cache_control(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_pipeline_creation_cache_control.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_pipeline_creation_cache_control](#VK_EXT_pipeline_creation_cache_control)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Background](#_background)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_pipeline_creation_cache_control - device extension

**Name String**

`VK_EXT_pipeline_creation_cache_control`

**Extension Type**

Device extension

**Registered Extension Number**

298

**Revision**

3

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Gregory Grebe [grgrebe_amd](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_pipeline_creation_cache_control] @grgrebe_amd%0A*Here describe the issue or question you have about the VK_EXT_pipeline_creation_cache_control extension*)

**Last Modified Date**

2020-03-23

**IP Status**

No known IP claims.

**Contributors**

* 
Gregory Grebe, AMD

* 
Tobias Hector, AMD

* 
Matthaeus Chajdas, AMD

* 
Mitch Singer, AMD

* 
Spencer Fricke, Samsung Electronics

* 
Stuart Smith, Imagination Technologies

* 
Jeff Bolz, NVIDIA Corporation

* 
Daniel Koch, NVIDIA Corporation

* 
Dan Ginsburg, Valve Corporation

* 
Jeff Leger, QUALCOMM

* 
Michal Pietrasiuk, Intel

* 
Jan-Harald Fredriksen, Arm Limited

This extension adds flags to `Vk*PipelineCreateInfo` and
[VkPipelineCacheCreateInfo](VkPipelineCacheCreateInfo.html) structures with the aim of improving the
predictability of pipeline creation cost.
The goal is to provide information about potentially expensive hazards
within the client driver during pipeline creation to the application before
carrying them out rather than after.

Pipeline creation is a costly operation, and the explicit nature of the
Vulkan design means that cost is not hidden from the developer.
Applications are also expected to schedule, prioritize, and load balance all
calls for pipeline creation.
It is strongly advised that applications create pipelines sufficiently ahead
of their usage.
Failure to do so will result in an unresponsive application, intermittent
stuttering, or other poor user experiences.
Proper usage of pipeline caches and/or derivative pipelines help mitigate
this but is not assured to eliminate disruption in all cases.
In the event that an ahead-of-time creation is not possible, considerations
should be taken to ensure that the current execution context is suitable for
the workload of pipeline creation including possible shader compilation.

Applications making API calls to create a pipeline must be prepared for any
of the following to occur:

* 
OS/kernel calls to be made by the ICD

* 
Internal memory allocation not tracked by the `pAllocator` passed to
`vkCreate*Pipelines`

* 
Internal thread synchronization or yielding of the current thread’s core

* 
Extremely long (multi-millisecond+), blocking, compilation times

* 
Arbitrary call stacks depths and stack memory usage

The job or task based game engines that are being developed to take
advantage of explicit graphics APIs like Vulkan may behave exceptionally
poorly if any of the above scenarios occur.
However, most game engines are already built to “stream” in assets
dynamically as the user plays the game.
By adding control by way of [VkPipelineCreateFlags](VkPipelineCreateFlags.html), we can require an
ICD to report back a failure in critical execution paths rather than forcing
an unexpected wait.

Applications can prevent unexpected compilation by setting
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_EXT](VkPipelineCreateFlagBits.html) on
`Vk*PipelineCreateInfo`::`flags`.
When set, an ICD must not attempt pipeline or shader compilation to create
the pipeline object.
In such a case, if the implementation fails to create a pipeline without
compilation, the implementation **must** return the result
[VK_PIPELINE_COMPILE_REQUIRED_EXT](VkResult.html) and return [VK_NULL_HANDLE](VK_NULL_HANDLE.html) for
the pipeline.

By default `vkCreate*Pipelines` calls must attempt to create all
pipelines before returning.
Setting [VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT_EXT](VkPipelineCreateFlagBits.html) on
`Vk*PipelineCreateInfo`::`flags` can be used as an escape hatch for
batched pipeline creates.

Hidden locks also add to the unpredictability of the cost of pipeline
creation.
The most common case of locks inside the `vkCreate*Pipelines` is
internal synchronization of the [VkPipelineCache](VkPipelineCache.html) object.
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT_EXT](VkPipelineCacheCreateFlagBits.html) can be set
when calling [vkCreatePipelineCache](vkCreatePipelineCache.html) to state the cache is
[externally synchronized](../../../../spec/latest/chapters/fundamentals.html#fundamentals-threadingbehavior).

The hope is that armed with this information application and engine
developers can leverage existing asset streaming systems to recover from
"just-in-time" pipeline creation stalls.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePipelineCreationCacheControlFeaturesEXT](VkPhysicalDevicePipelineCreationCacheControlFeatures.html)

* 
[VkPipelineCacheCreateFlagBits](VkPipelineCacheCreateFlagBits.html)

* 
`VK_EXT_PIPELINE_CREATION_CACHE_CONTROL_EXTENSION_NAME`

* 
`VK_EXT_PIPELINE_CREATION_CACHE_CONTROL_SPEC_VERSION`

* 
Extending [VkPipelineCacheCreateFlagBits](VkPipelineCacheCreateFlagBits.html):

[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT_EXT](VkPipelineCacheCreateFlagBits.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_EXT](VkPipelineCreateFlagBits.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_PIPELINE_COMPILE_REQUIRED_EXT](VkResult.html)

* 
[VK_PIPELINE_COMPILE_REQUIRED_EXT](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_CREATION_CACHE_CONTROL_FEATURES_EXT](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the EXT
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

* 
Revision 1, 2019-11-01 (Gregory Grebe)

Initial revision

Revision 2, 2020-02-24 (Gregory Grebe)

* 
Initial public revision

Revision 3, 2020-03-23 (Tobias Hector)

* 
Changed [VK_PIPELINE_COMPILE_REQUIRED_EXT](VkResult.html) to a success code,
adding an alias for the original
[VK_ERROR_PIPELINE_COMPILE_REQUIRED_EXT](VkResult.html).
Also updated the xml to include these codes as return values.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_pipeline_creation_cache_control).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
