# VK_NV_device_generated_commands(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_device_generated_commands.html

## Table of Contents

- [Name](#_name)
- [VK_NV_device_generated_commands](#VK_NV_device_generated_commands)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Example Code](#_example_code)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_device_generated_commands - device extension

**Name String**

`VK_NV_device_generated_commands`

**Extension Type**

Device extension

**Registered Extension Number**

278

**Revision**

3

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)

or

[Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**Contact**

* 
Christoph Kubisch [pixeljetstream](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_device_generated_commands] @pixeljetstream%0A*Here describe the issue or question you have about the VK_NV_device_generated_commands extension*)

**Last Modified Date**

2020-02-20

**Interactions and External Dependencies**

* 
This extension requires Vulkan 1.1

* 
This extension requires `VK_EXT_buffer_device_address` or
`VK_KHR_buffer_device_address` or Vulkan 1.2 for the ability to bind
vertex and index buffers on the device.

* 
This extension interacts with `VK_NV_mesh_shader`.
If the latter extension is not supported, remove the command token to
initiate mesh tasks drawing in this extension.

**Contributors**

* 
Christoph Kubisch, NVIDIA

* 
Pierre Boudier, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Eric Werness, NVIDIA

* 
Yuriy O’Donnell, Epic Games

* 
Baldur Karlsson, Valve

* 
Mathias Schott, NVIDIA

* 
Tyson Smith, NVIDIA

* 
Ingo Esser, NVIDIA

This extension allows the device to generate a number of critical graphics
commands for command buffers.

When rendering a large number of objects, the device can be leveraged to
implement a number of critical functions, like updating matrices, or
implementing occlusion culling, frustum culling, front to back sorting, etc.
Implementing those on the device does not require any special extension,
since an application is free to define its own data structures, and just
process them using shaders.

However, if the application desires to quickly kick off the rendering of the
final stream of objects, then unextended Vulkan forces the application to
read back the processed stream and issue graphics command from the host.
For very large scenes, the synchronization overhead and cost to generate the
command buffer can become the bottleneck.
This extension allows an application to generate a device side stream of
state changes and commands, and convert it efficiently into a command buffer
without having to read it back to the host.

Furthermore, it allows incremental changes to such command buffers by
manipulating only partial sections of a command stream — for example
pipeline bindings.
Unextended Vulkan requires re-creation of entire command buffers in such a
scenario, or updates synchronized on the host.

The intended usage for this extension is for the application to:

* 
create `VkBuffer` objects and retrieve physical addresses from them
via [vkGetBufferDeviceAddressEXT](vkGetBufferDeviceAddress.html)

* 
create a graphics pipeline using
`VkGraphicsPipelineShaderGroupsCreateInfoNV` for the ability to
change shaders on the device.

* 
create a [VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html), which lists the
[VkIndirectCommandsTokenTypeNV](VkIndirectCommandsTokenTypeNV.html) it wants to dynamically execute as
an atomic command sequence.
This step likely involves some internal device code compilation, since
the intent is for the GPU to generate the command buffer in the
pipeline.

* 
fill the input stream buffers with the data for each of the inputs it
needs.
Each input is an array that will be filled with token-dependent data.

* 
set up a preprocess `VkBuffer` that uses memory according to the
information retrieved via
[vkGetGeneratedCommandsMemoryRequirementsNV](vkGetGeneratedCommandsMemoryRequirementsNV.html).

* 
optionally preprocess the generated content using
[vkCmdPreprocessGeneratedCommandsNV](vkCmdPreprocessGeneratedCommandsNV.html), for example on an asynchronous
compute queue, or for the purpose of reusing the data in multiple
executions.

* 
call [vkCmdExecuteGeneratedCommandsNV](vkCmdExecuteGeneratedCommandsNV.html) to create and execute the
actual device commands for all sequences based on the inputs provided.

For each draw in a sequence, the following can be specified:

* 
a different shader group

* 
a number of vertex buffer bindings

* 
a different index buffer, with an optional dynamic offset and index type

* 
a number of different push constants

* 
a flag that encodes the primitive winding

While the GPU can be faster than a CPU to generate the commands, it will not
happen asynchronously to the device, therefore the primary use case is
generating “less” total work (occlusion culling, classification to use
specialized shaders, etc.).

* 
[VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html)

* 
[vkCmdBindPipelineShaderGroupNV](vkCmdBindPipelineShaderGroupNV.html)

* 
[vkCmdExecuteGeneratedCommandsNV](vkCmdExecuteGeneratedCommandsNV.html)

* 
[vkCmdPreprocessGeneratedCommandsNV](vkCmdPreprocessGeneratedCommandsNV.html)

* 
[vkCreateIndirectCommandsLayoutNV](vkCreateIndirectCommandsLayoutNV.html)

* 
[vkDestroyIndirectCommandsLayoutNV](vkDestroyIndirectCommandsLayoutNV.html)

* 
[vkGetGeneratedCommandsMemoryRequirementsNV](vkGetGeneratedCommandsMemoryRequirementsNV.html)

* 
[VkBindIndexBufferIndirectCommandNV](VkBindIndexBufferIndirectCommandNV.html)

* 
[VkBindShaderGroupIndirectCommandNV](VkBindShaderGroupIndirectCommandNV.html)

* 
[VkBindVertexBufferIndirectCommandNV](VkBindVertexBufferIndirectCommandNV.html)

* 
[VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html)

* 
[VkGeneratedCommandsMemoryRequirementsInfoNV](VkGeneratedCommandsMemoryRequirementsInfoNV.html)

* 
[VkGraphicsShaderGroupCreateInfoNV](VkGraphicsShaderGroupCreateInfoNV.html)

* 
[VkIndirectCommandsLayoutCreateInfoNV](VkIndirectCommandsLayoutCreateInfoNV.html)

* 
[VkIndirectCommandsLayoutTokenNV](VkIndirectCommandsLayoutTokenNV.html)

* 
[VkIndirectCommandsStreamNV](VkIndirectCommandsStreamNV.html)

* 
[VkSetStateFlagsIndirectCommandNV](VkSetStateFlagsIndirectCommandNV.html)

* 
Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html):

[VkGraphicsPipelineShaderGroupsCreateInfoNV](VkGraphicsPipelineShaderGroupsCreateInfoNV.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV](VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV.html)

* 
[VkIndirectCommandsLayoutUsageFlagBitsNV](VkIndirectCommandsLayoutUsageFlagBitsNV.html)

* 
[VkIndirectCommandsTokenTypeNV](VkIndirectCommandsTokenTypeNV.html)

* 
[VkIndirectStateFlagBitsNV](VkIndirectStateFlagBitsNV.html)

* 
[VkIndirectCommandsLayoutUsageFlagsNV](VkIndirectCommandsLayoutUsageFlagsNV.html)

* 
[VkIndirectStateFlagsNV](VkIndirectStateFlagsNV.html)

* 
`VK_NV_DEVICE_GENERATED_COMMANDS_EXTENSION_NAME`

* 
`VK_NV_DEVICE_GENERATED_COMMANDS_SPEC_VERSION`

* 
Extending [VkAccessFlagBits](VkAccessFlagBits.html):

[VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_NV](VkAccessFlagBits.html)

* 
[VK_ACCESS_COMMAND_PREPROCESS_WRITE_BIT_NV](VkAccessFlagBits.html)

Extending [VkObjectType](VkObjectType.html):

* 
[VK_OBJECT_TYPE_INDIRECT_COMMANDS_LAYOUT_NV](VkObjectType.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html)

Extending [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html):

* 
[VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_GENERATED_COMMANDS_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_GENERATED_COMMANDS_MEMORY_REQUIREMENTS_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_SHADER_GROUPS_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_GRAPHICS_SHADER_GROUP_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_TOKEN_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_PROPERTIES_NV](VkStructureType.html)

1) How to name this extension ?

`VK_NV_device_generated_commands`

As usual, one of the hardest issues ;)

Alternatives: `VK_gpu_commands`, `VK_execute_commands`,
`VK_device_commands`, `VK_device_execute_commands`, `VK_device_execute`,
`VK_device_created_commands`, `VK_device_recorded_commands`,
`VK_device_generated_commands` `VK_indirect_generated_commands`

2) Should we use a serial stateful token stream or stateless sequence
descriptions?

Similarly to [VkPipeline](VkPipeline.html), fixed layouts have the most likelihood to be
cross-vendor adoptable.
They also benefit from being processable in parallel.
This is a different design choice compared to the serial command stream
generated through `GL_NV_command_list`.

3) How to name a sequence description?

`VkIndirectCommandsLayout` as in the NVX extension predecessor.

Alternative: `VkGeneratedCommandsLayout`

4) Do we want to provide `indirectCommands` inputs with layout or at
`indirectCommands` time?

Separate layout from data as Vulkan does.
Provide full flexibility for `indirectCommands`.

5) Should the input be provided as SoA or AoS?

Both ways are desirable.
AoS can provide portability to other APIs and easier to setup, while SoA
allows to update individual inputs in a cache-efficient manner, when others
remain static.

6) How do we make developers aware of the memory requirements of
implementation-dependent data used for the generated commands?

Make the API explicit and introduce a `preprocess` [VkBuffer](VkBuffer.html).
Developers have to allocate it using
[vkGetGeneratedCommandsMemoryRequirementsNV](vkGetGeneratedCommandsMemoryRequirementsNV.html).

In the NVX version the requirements were hidden implicitly as part of the
command buffer reservation process, however as the memory requirements can
be substantial, we want to give developers the ability to budget the memory
themselves.
By lowering the `maxSequencesCount` the memory consumption can be reduced.
Furthermore reuse of the memory is possible, for example for doing explicit
preprocessing and execution in a ping-pong fashion.

The actual buffer size is implementation-dependent and may be zero, i.e. not
always required.

When making use of Graphics Shader Groups, the programs should behave
similarly with regards to vertex inputs, clipping and culling outputs of the
geometry stage, and sample shading behavior in fragment shaders, to reduce
the amount of the worst-case memory approximation.

7) Should we allow additional per-sequence dynamic state changes?

Yes

Introduced a lightweight indirect state flag
[VkIndirectStateFlagBitsNV](VkIndirectStateFlagBitsNV.html).
So far only switching front face winding state is exposed.
Especially in CAD/DCC mirrored transforms that require such changes are
common, and similar flexibility is given in the ray tracing instance
description.

The flag could be extended further, for example to switch between
primitive-lists or -strips, or make other state modifications.

Furthermore, as new tokens can be added easily, future extension could add
the ability to change any [VkDynamicState](VkDynamicState.html).

8) How do we allow reusing already “generated” `indirectCommands`?

Expose a `preprocessBuffer` to reuse implementation-dependencyFlags data.
Set `isPreprocessed` to [VK_TRUE](VK_TRUE.html) in
[vkCmdExecuteGeneratedCommandsNV](vkCmdExecuteGeneratedCommandsNV.html).

9) Under which conditions is [vkCmdExecuteGeneratedCommandsNV](vkCmdExecuteGeneratedCommandsNV.html) legal?

It behaves like a regular draw call command.

10) Is [vkCmdPreprocessGeneratedCommandsNV](vkCmdPreprocessGeneratedCommandsNV.html) copying the input data or
referencing it?

There are multiple implementations possible:

* 
one could have some emulation code that parses the inputs, and generates
an output command buffer, therefore copying the inputs.

* 
one could just reference the inputs, and have the processing done in
pipe at execution time.

If the data is mandated to be copied, then it puts a penalty on
implementation that could process the inputs directly in pipe.
If the data is “referenced”, then it allows both types of implementation.

The inputs are “referenced”, and **must** not be modified after the call to
[vkCmdExecuteGeneratedCommandsNV](vkCmdExecuteGeneratedCommandsNV.html) has completed.

11) Which buffer usage flags are required for the buffers referenced by
`VkGeneratedCommandsInfoNV` ?

Reuse existing [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html)

* 
[VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html)::`preprocessBuffer`

* 
[VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html)::`sequencesCountBuffer`

* 
[VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html)::`sequencesIndexBuffer`

* 
[VkIndirectCommandsStreamNV](VkIndirectCommandsStreamNV.html)::`buffer`

12) In which pipeline stage does the device generated command expansion
happen?

[vkCmdPreprocessGeneratedCommandsNV](vkCmdPreprocessGeneratedCommandsNV.html) is treated as if it occurs in a
separate logical pipeline from either graphics or compute, and that pipeline
only includes [VK_PIPELINE_STAGE_TOP_OF_PIPE_BIT](VkPipelineStageFlagBits.html), a new stage
[VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits.html), and
[VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT](VkPipelineStageFlagBits.html).
This new stage has two corresponding new access types,
[VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_NV](VkAccessFlagBits.html) and
[VK_ACCESS_COMMAND_PREPROCESS_WRITE_BIT_NV](VkAccessFlagBits.html), used to synchronize reading
the buffer inputs and writing the preprocess memory output.

The generated output written in the preprocess buffer memory by
[vkCmdExecuteGeneratedCommandsNV](vkCmdExecuteGeneratedCommandsNV.html) is considered to be consumed by the
[VK_PIPELINE_STAGE_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits.html) pipeline stage.

Thus, to synchronize from writing the input buffers to preprocessing via
[vkCmdPreprocessGeneratedCommandsNV](vkCmdPreprocessGeneratedCommandsNV.html), use:

* 
`dstStageMask` = [VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits.html)

* 
`dstAccessMask` = [VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_NV](VkAccessFlagBits.html)

To synchronize from [vkCmdPreprocessGeneratedCommandsNV](vkCmdPreprocessGeneratedCommandsNV.html) to executing
the generated commands by [vkCmdExecuteGeneratedCommandsNV](vkCmdExecuteGeneratedCommandsNV.html), use:

* 
`srcStageMask` = [VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits.html)

* 
`srcAccessMask` = [VK_ACCESS_COMMAND_PREPROCESS_WRITE_BIT_NV](VkAccessFlagBits.html)

* 
`dstStageMask` = [VK_PIPELINE_STAGE_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits.html)

* 
`dstAccessMask` = [VK_ACCESS_INDIRECT_COMMAND_READ_BIT](VkAccessFlagBits.html)

When [vkCmdExecuteGeneratedCommandsNV](vkCmdExecuteGeneratedCommandsNV.html) is used with a
`isPreprocessed` of `VK_FALSE`, the generated commands are implicitly
preprocessed, therefore one only needs to synchronize the inputs via:

* 
`dstStageMask` = [VK_PIPELINE_STAGE_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits.html)

* 
`dstAccessMask` = [VK_ACCESS_INDIRECT_COMMAND_READ_BIT](VkAccessFlagBits.html)

13) What if most token data is “static”, but we frequently want to render
a subsection?

Added “sequencesIndexBuffer”.
This allows to easier sort and filter what should actually be executed.

14) What are the changes compared to the previous NVX extension?

* 
Compute dispatch support was removed (was never implemented in drivers).
There are different approaches how dispatching from the device should
work, hence we defer this to a future extension.

* 
The `ObjectTableNVX` was replaced by using physical buffer addresses and
introducing Shader Groups for the graphics pipeline.

* 
Less state changes are possible overall, but the important operations
are still there (reduces complexity of implementation).

* 
The API was redesigned so all inputs must be passed at both
preprocessing and execution time (this was implicit in NVX, now it is
explicit)

* 
The reservation of intermediate command space is now mandatory and
explicit through a preprocess buffer.

* 
The [VkIndirectStateFlagBitsNV](VkIndirectStateFlagBitsNV.html) were introduced

15) When porting from other APIs, their indirect buffers may use different
    enums, for example for index buffer types.
    How to solve this?

Added “pIndexTypeValues” to map custom `uint32_t` values to corresponding
[VkIndexType](VkIndexType.html).

16) Do we need more shader group state overrides?

The NVX version allowed all PSO states to be different, however as the goal
is not to replace all state setup, but focus on highly-frequent state
changes for drawing lots of objects, we reduced the amount of state
overrides.
Especially VkPipelineLayout as well as VkRenderPass configuration should be
left static, the rest is still open for discussion.

The current focus is just to allow VertexInput changes as well as shaders,
while all shader groups use the same shader stages.

Too much flexibility will increase the test coverage requirement as well.
However, further extensions could allow more dynamic state as well.

17) Do we need more detailed physical device feature queries/enables?

An EXT version would need detailed implementor feedback to come up with a
good set of features.
Please contact us if you are interested, we are happy to make more features
optional, or add further restrictions to reduce the minimum feature set of
an EXT.

18) Is there an interaction with VK_KHR_pipeline_library planned?

Yes, a future version of this extension will detail the interaction, once
VK_KHR_pipeline_library is no longer provisional.

Open-Source samples illustrating the usage of the extension can be found at
the following location (may not yet exist at time of writing):

[https://github.com/nvpro-samples/vk_device_generated_cmds](https://github.com/nvpro-samples/vk_device_generated_cmds)

* 
Revision 1, 2020-02-20 (Christoph Kubisch)

Initial version

Revision 2, 2020-03-09 (Christoph Kubisch)

* 
Remove VK_EXT_debug_report interactions

Revision 3, 2020-03-09 (Christoph Kubisch)

* 
Fix naming VkPhysicalDeviceGenerated to VkPhysicalDeviceDeviceGenerated

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_device_generated_commands).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
