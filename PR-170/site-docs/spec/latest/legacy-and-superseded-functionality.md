# Legacy and Superseded Functionality

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/appendices/legacy.html

## Table of Contents

- [List of Legacy Functionality](#_list_of_legacy_functionality)
- [List_of_Legacy_Functionality](#_list_of_legacy_functionality)
- [Physical Device Queries: Superseded via version 2](#legacy-gpdp2)
- [Physical_Device_Queries:_Superseded_via_version_2](#legacy-gpdp2)
- [Version Macros: Superseded via replacements including API variant](#legacy-version-macros)
- [Version_Macros:_Superseded_via_replacements_including_API_variant](#legacy-version-macros)
- [Device Layers: Superseded via instance layers](#legacy-devicelayers)
- [Device_Layers:_Superseded_via_instance_layers](#legacy-devicelayers)
- [Render Pass Functions: Superseded via version 2](#legacy-renderpass2)
- [Render_Pass_Functions:_Superseded_via_version_2](#legacy-renderpass2)
- [Render Pass Objects: Superseded via dynamic rendering](#_render_pass_objects_superseded_via_dynamic_rendering)
- [Render_Pass_Objects:_Superseded_via_dynamic_rendering](#_render_pass_objects_superseded_via_dynamic_rendering)
- [Sampler and Buffer View Objects: Unnecessary with Descriptor Heaps](#legacy-resource-objects)
- [Sampler_and_Buffer_View_Objects:_Unnecessary_with_Descriptor_Heaps](#legacy-resource-objects)
- [Descriptor Management: Replaced by descriptor Heaps](#legacy-descriptor-sets)
- [Descriptor_Management:_Replaced_by_descriptor_Heaps](#legacy-descriptor-sets)
- [Synchronization Commands: Deprecation via version 2](#deprecation-sync2)
- [Synchronization_Commands:_Deprecation_via_version_2](#deprecation-sync2)
- [32-bit Flags: Extended by 64-bit Flags](#legacy-flagbits)
- [32-bit_Flags:_Extended_by_64-bit_Flags](#legacy-flagbits)
- [Buffer Commands: Superseded by device address commands](#legacy-buffer-commands)
- [Buffer_Commands:_Superseded_by_device_address_commands](#legacy-buffer-commands)

## Content

Functionality in the specification such as commands and structures **may** be
marked as *legacy*.
This label indicates that either functionality that supersedes it is
available in a newer core version, or the functionality has simply fallen
out of favor for other reasons.
Forward-looking applications **should** avoid using functionality marked as
legacy where possible.

A link to an explanatory section is provided to explain why the
functionality was marked as legacy, what functionality supersedes it (if
any), and what applications **should** do instead.

Newer extensions **may** also provide functionality that supersedes existing
functionality, but the original functionality will not be tagged as legacy
in the specification unless a superseding solution has been fully promoted
to the core API.
Explanatory text will still be included below for these cases as reference.

|  | Legacy and superseded functionality is tagged in the xml registry via a
| --- | --- |
deprecation tag, for both core versions and extensions.
It is expected that tooling such as the validation layers will be able to
warn users when they are making use of any functionality that is either
legacy or superseded by the version and extensions the application has
enabled. |

Legacy functionality remains available for use in the specification, but it
**may** be less capable than newer functionality.
Interactions with legacy functionality will often be omitted when new
extensions or features are developed, so legacy functionality **may** not work
with the latest features.

|  | Another mechanism exists to indicate that an entire extension is considered
| --- | --- |
legacy, using different terminology.
See [the Deprecation section of the Extensions chapter](../chapters/extensions.html#extendingvulkan-compatibility-deprecation) for more information. |

When functionality is marked as legacy or if an extension supersedes it, an
explanation will be added to the following sections.

|  | This list is a work in progress - we intend to add other items to this
| --- | --- |
section over time.
Examples include shader modules (superseded by [VK_KHR_maintenance5](extensions.html#VK_KHR_maintenance5))
and anything superseded by a new version of the same functionality (e.g.
[VK_KHR_synchronization2](extensions.html#VK_KHR_synchronization2)). |

[VK_KHR_get_physical_device_properties2](extensions.html#VK_KHR_get_physical_device_properties2) was incorporated into Vulkan
1.1, which introduced new versions of several physical device query
functions.
These provide the same functionality as the Vulkan 1.0 functionality but
with greater extensibility.

When querying device features, [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2) **should** be
used instead of [vkGetPhysicalDeviceFeatures](../chapters/features.html#vkGetPhysicalDeviceFeatures).
When enabling device features, [VkPhysicalDeviceFeatures2](../chapters/features.html#VkPhysicalDeviceFeatures2) **should** be
provided in the `pNext` chain of [VkDeviceCreateInfo](../chapters/devsandqueues.html#VkDeviceCreateInfo) instead of
using [VkDeviceCreateInfo](../chapters/devsandqueues.html#VkDeviceCreateInfo)::pEnabledFeatures.

The version macros that do not take the API variant into account, such as
[VK_MAKE_VERSION](../chapters/extensions.html#VK_MAKE_VERSION) or [VK_VERSION_MAJOR](../chapters/extensions.html#VK_VERSION_MAJOR), are superseded by those
that do, such as [VK_MAKE_API_VERSION](../chapters/extensions.html#VK_MAKE_API_VERSION) or [VK_API_VERSION_MAJOR](../chapters/extensions.html#VK_API_VERSION_MAJOR).

Instead of [VK_API_VERSION](boilerplate.html#VK_API_VERSION), specific version defines (e.g.
[VK_API_VERSION_1_0](../chapters/extensions.html#VK_API_VERSION_1_0)) or the [VK_MAKE_API_VERSION](../chapters/extensions.html#VK_MAKE_API_VERSION) macro should be
used instead.

Previous versions of this specification distinguished between instance and
device layers.
Instance layers were only able to intercept commands that operate on
`VkInstance` and `VkPhysicalDevice`, except they were not able to
intercept [vkCreateDevice](../chapters/devsandqueues.html#vkCreateDevice).
Device layers were enabled for individual devices when they were created,
and could only intercept commands operating on that device or its child
objects.

Device-only layers are now marked as legacy, and this specification no
longer distinguishes between instance and device layers.
Layers are enabled during instance creation, and are able to intercept all
commands operating on that instance or any of its child objects.
At the time this was marked as legacy, there were no known device-only
layers and no compelling reason to create one.

[VK_KHR_create_renderpass2](extensions.html#VK_KHR_create_renderpass2)
and
Vulkan 1.2
introduced new versions of several render pass functions.
These provide the same functionality as the Vulkan 1.0 functionality but
with greater extensibility.

|  | Render pass objects and all related commands are further
| --- | --- |
[superseded by dynamic rendering](#legacy-dynamicrendering). |

[VK_KHR_dynamic_rendering](extensions.html#VK_KHR_dynamic_rendering)
and
Vulkan 1.3
added a new way to specify render passes without needing to create
[VkFramebuffer](../chapters/renderpass.html#VkFramebuffer) and [VkRenderPass](../chapters/renderpass.html#VkRenderPass) objects.
However, subpass functionality had no equivalent, meaning dynamic rendering
was only suitable as a substitute for content not using subpasses.

[VK_KHR_dynamic_rendering_local_read](extensions.html#VK_KHR_dynamic_rendering_local_read)
and
Vulkan 1.4
later allowed the expression of most subpass functionality in core or
extensions.
Any subpass functionality which was not replicated is still expressible but
requires applications to split work over multiple dynamic render pass
instances.
Functionality not covered with local reads would result in most or all
vendors splitting the subpass internally.

|  | [VK_QCOM_render_pass_shader_resolve](extensions.html#VK_QCOM_render_pass_shader_resolve) does not have equivalent
| --- | --- |
functionality exposed via dynamic rendering.
Use of legacy functionality will be required to use that extension
unless/until replacements are created. |

Outside of vendor extensions, applications are advised to make use of
[vkCmdBeginRendering](../chapters/renderpass.html#vkCmdBeginRendering) and [vkCmdEndRendering](../chapters/renderpass.html#vkCmdEndRendering) to manage render
passes from this API version onward.

When using [descriptor heaps](../chapters/descriptorheaps.html#descriptorheaps), the creation of sampler and
buffer view objects are wholly unnecessary.
Instead, these objects are directly converted to descriptors via
[vkWriteSamplerDescriptorsEXT](../chapters/descriptorheaps.html#vkWriteSamplerDescriptorsEXT) and [vkWriteResourceDescriptorsEXT](../chapters/descriptorheaps.html#vkWriteResourceDescriptorsEXT),
skipping the need to create objects altogether.
In the case of samplers, samplers can also be embedded directly into a
shader via [shader bindings](../chapters/descriptorheaps.html#descriptorheaps-bindings), which only
requires the [VkSamplerCreateInfo](../chapters/samplers.html#VkSamplerCreateInfo), rather than a created object.

The creation of image views can also be skipped similarly for images used as
descriptors, but image views themselves are still used elsewhere in the
spec, such as for [render passes](../chapters/renderpass.html#renderpass).

[Descriptor heaps](../chapters/descriptorheaps.html#descriptorheaps) provide a complete alternative for
managing shader resources, and can be used where present instead of the
resource management provided by Vulkan 1.0.
[Descriptor heaps](../chapters/descriptorheaps.html#descriptorheaps) can similarly be used instead of
[VK_EXT_descriptor_buffer](extensions.html#VK_EXT_descriptor_buffer).

While it is possible to use a mix of these in the same application, they
cannot be used at the same time, and there are potential performance
penalties for switching on some implementations.

[VK_KHR_synchronization2](extensions.html#VK_KHR_synchronization2) was incorporated into Vulkan 1.3, which
introduced new versions of synchronization functions.
These provide the same functionality as the Vulkan 1.0 functionality but
with greater extensibility.

Synchronization 2 commands **should** be used instead of synchronization 1
commands.

There is one piece of functionality in the original synchronization commands
that cannot be mapped easily however.
[vkCmdSetEvent](../chapters/synchronization.html#vkCmdSetEvent) did not include an access scope; instead the access
scope for an event dependency was fully specified by [vkCmdWaitEvents](../chapters/synchronization.html#vkCmdWaitEvents).
This allowed execution only dependencies to be expressed with cache access
management handled at the end of the command.
While the same dependencies can be expressed in
[VK_KHR_synchronization2](extensions.html#VK_KHR_synchronization2), it is not a 1:1 mapping, requiring
additional commands to be recorded, and so may not be as efficient.

[VK_KHR_maintenance9](extensions.html#VK_KHR_maintenance9) added the
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](../chapters/synchronization.html#VkDependencyFlagBits) dependency flag, which enables
this use case with [vkCmdSetEvent2](../chapters/synchronization.html#vkCmdSetEvent2) and [vkCmdWaitEvents2](../chapters/synchronization.html#vkCmdWaitEvents2), making
it efficient to express the same dependencies.

New flag values added by this extension are additionally [extended to 64-bits](#legacy-flagbits).

Initially Vulkan used 32-bit types to representing sets of flags
(`Vk*Flags`) and individual flag bits (`Vk*FlagBits`).
New functionality added many new flag bits.
When the 32-bit types run out of available bits, new 64-bit flags
(`Vk*Flags2`) and flag bits (`Vk*FlagBits2`) types are introduced.

These new types include all of the flag bits defined by the 32-bit types
they correspond to, while allowing up to 32 additional bits.
The new types are contained by corresponding extending structures.
Such structures are used to specify or query flags by adding them to a
`pNext` chain.
When specifying 64-bit flags, those flags are used instead of the 32-bit
flags in the base structure being extended.
When querying 64-bit flags, both the 64-bit flags in the `pNext` chain
and the 32-bit flags in the in the base structure being extended are
returned.

64-bit flag and flag bit types are named the same as the 32-bit types they
supersede, but with the addition of a “2” ahead of any vendor suffix.
For example, [VkPipelineCreateFlagBits](../chapters/pipelines.html#VkPipelineCreateFlagBits) and [VkPipelineCreateFlags](../chapters/pipelines.html#VkPipelineCreateFlags)
are superseded by [VkPipelineCreateFlagBits2](../chapters/pipelines.html#VkPipelineCreateFlagBits2) and
[VkPipelineCreateFlags2](../chapters/pipelines.html#VkPipelineCreateFlags2), respectively.

Most commands that previously took buffer objects, including all command
buffer commands, have now been superseded by equivalent commands or
structures that use [VkDeviceAddressRangeKHR](../chapters/fundamentals.html#VkDeviceAddressRangeKHR) structures to specify the
address range directly.
Some of these need a little additional information from the application in
the form of [VkAddressCommandFlagBitsKHR](../chapters/fundamentals.html#VkAddressCommandFlagBitsKHR), which previously would have
been retrieved from the buffer object itself.
