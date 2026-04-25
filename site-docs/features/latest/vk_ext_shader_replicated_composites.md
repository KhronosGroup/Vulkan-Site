# VK_EXT_shader_replicated_composites

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_shader_replicated_composites.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. SPIR-V](#_spir_v)
- [3.2. Vulkan API](#_vulkan_api)
- [3.2._Vulkan_API](#_vulkan_api)
- [4. Examples](#_examples)
- [5. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. SPIR-V](#_spir_v)
[3.2. Vulkan API](#_vulkan_api)

[4. Examples](#_examples)
[5. Issues](#_issues)

This document proposes adding support for new SPIR-V instructions to construct
composites with a replicated value.

Several recent or in-development extensions require a way of constructing SPIR-V
composite values whose top-level constituents all have the same value. Doing
so with current SPIR-V requires the desired value to be repeated once for each
constituent of the composite value. This is undesirable from a succinctness
and code size point of view. As a result extensions have been modifying
existing core SPIR-V instructions. For example, `SPV_KHR_cooperative_matrix`
modifies the behavior of the core **OpConstantComposite** instruction
for cooperative matrix types. Other extensions in development face the same
issue and will likely adopt a similar solution if SPIR-V does not introduce
standard support for this in time.

These modifications go against some of the key design principles for SPIR-V:
that instructions should not behave differently depending on the types
they operate on.

Furthermore, there are scenarios in which the number of constituents of a
composite is not known at SPIR-V module production time (e.g. an array
whose *Length* is a specialization constant) and providing a value for
each of the constituents is not only undesirable in that case but
simply impossible.

Lastly, high-level languages often allow the initialization of composite
objects from a replicated value. Compilers currently have to duplicate
those initialisers when generating SPIR-V modules.

Do nothing. Some extensions can modify the behavior of core SPIR-V, in a way
that is undesirable, or accept the code size issues. Some patterns are not
expressible.

Provide new SPIR-V instructions to create composites with a replicated value.
This is the proposed solution.

Add three new instructions to SPIR-V that enable creating composite values
from a replicated value:

* 
**OpConstantCompositeReplicateEXT** can be used to declare a new composite
constant whose constituents all have the same value.

* 
**OpSpecConstantCompositeReplicateEXT** can be used to declare a new composite
specialization constant whose constituents all have the same value.

* 
**OpCompositeConstructReplicateEXT** can be used to construct a new composite
object whose constituents all have the same value.

A new **ReplicatedCompositesEXT** capability enables the three new instructions.

Add a `VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT` structure that comprises
a single `shaderReplicatedComposites` feature that specifies whether the **ReplicatedCompositesEXT**
capability can be used in shader modules:

typedef struct VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT {
    VkStructureType sType;
    void*           pNext;
    VkBool32        shaderReplicatedComposites;
} VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT;

Declare a constant vector of 4 integers with the value 42:

%uint = OpTypeInt 32 0
%uint_42 = OpConstant %uint 42
%vector = OpTypeVector %uint 4
%vector_of_42 = OpConstantCompositeReplicateEXT %vector %uint_42

Construct a structure object whose all constituents have the value 1:

%uint = OpTypeInt 32 0
%uint_1 = OpConstant %uint 1
%struct = OpTypeStruct %uint %uint %uint
%struct_all_ones = OpCompositeConstructReplicateEXT %struct %uint_1

Declare an array constant whose length is a specicialisation constant
and all elements have the value 15:

%uint = OpTypeInt 32 0
%uint_1 = OpConstant %uint 1
%uint_15 = OpConstant %uint 15
%length = OpSpecConstant %uint %uint_1
%array = OpTypeArray %uint %length
%array_of_15 = OpSpecConstantCompositeReplicateEXT %array %uint_15

None.
