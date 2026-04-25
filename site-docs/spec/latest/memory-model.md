# Memory Model

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/appendices/memorymodel.html

## Table of Contents

- [Agent](#memory-model-agent)
- [Memory Location](#memory-model-memory-location)
- [Allocation](#memory-model-allocation)
- [Memory Operation](#memory-model-memory-operation)
- [Reference](#memory-model-references)
- [Program-Order](#memory-model-program-order)
- [Shader Call Related](#shader-call-related)
- [Shader_Call_Related](#shader-call-related)
- [Shader Call Order](#shader-call-order)
- [Shader_Call_Order](#shader-call-order)
- [Scope](#memory-model-scope)
- [Atomic Operation](#memory-model-atomic-operation)
- [Scoped Modification Order](#memory-model-scoped-modification-order)
- [Scoped_Modification_Order](#memory-model-scoped-modification-order)
- [Memory Semantics](#memory-model-memory-semantics)
- [Release Sequence](#memory-model-release-sequence)
- [Synchronizes-With](#memory-model-synchronizes-with)
- [System-Synchronizes-With](#memory-model-system-synchronizes-with)
- [Private vs. Non-Private](#memory-model-non-private)
- [Private_vs._Non-Private](#memory-model-non-private)
- [Inter-Thread-Happens-Before](#memory-model-inter-thread-happens-before)
- [Happens-Before](#memory-model-happens-before)
- [Availability and Visibility](#memory-model-availability-visibility)
- [Availability_and_Visibility](#memory-model-availability-visibility)
- [Availability, Visibility, and Domain Operations](#memory-model-vulkan-availability-visibility)
- [Availability,_Visibility,_and_Domain_Operations](#memory-model-vulkan-availability-visibility)
- [Availability and Visibility Semantics](#memory-model-availability-visibility-semantics)
- [Availability_and_Visibility_Semantics](#memory-model-availability-visibility-semantics)
- [Per-Instruction Availability and Visibility Semantics](#memory-model-instruction-av-vis)
- [Per-Instruction_Availability_and_Visibility_Semantics](#memory-model-instruction-av-vis)
- [Location-Ordered](#memory-model-location-ordered)
- [Data Race](#memory-model-access-data-race)
- [Visible-To](#memory-model-visible-to)
- [Acyclicity](#memory-model-acyclicity)
- [Scoped Modification Order Coherence](#memory-model-scoped-modification-order-coherence)
- [Scoped_Modification_Order_Coherence](#memory-model-scoped-modification-order-coherence)
- [Shader I/O](#memory-model-shader-io)
- [Deallocation](#memory-model-deallocation)
- [Descriptions (Informative)](#memory-model-informative-descriptions)
- [Tessellation Output Ordering](#memory-model-tessellation-output-ordering)
- [Tessellation_Output_Ordering](#memory-model-tessellation-output-ordering)
- [Cooperative Matrix Memory Access](#memory-model-cooperative-matrix)
- [Cooperative_Matrix_Memory_Access](#memory-model-cooperative-matrix)

## Content

|  | This memory model describes synchronizations provided by all
| --- | --- |
implementations; however, some of the synchronizations defined require extra
features to be supported by the implementation.
See [VkPhysicalDeviceVulkanMemoryModelFeatures](../chapters/features.html#VkPhysicalDeviceVulkanMemoryModelFeatures). |

*Operation* is a general term for any task that is executed on the system.

|  | An operation is by definition something that is executed.
| --- | --- |
Thus if an instruction is skipped due to control flow, it does not
constitute an operation. |

Each operation is executed by a particular *agent*.
Possible agents include each:

* 
fixed-function stage of the pipeline,

* 
shader invocation, or

* 
host thread.

A *memory location* identifies unique storage for 8 bits of data.
Memory operations access a *set of memory locations* consisting of one or
more memory locations at a time, e.g. an operation accessing a 32-bit
integer in memory would read/write a set of four memory locations.
Memory operations that access whole aggregates **may** access any padding bytes
between elements or members, but no padding bytes at the end of the
aggregate.
Two sets of memory locations *overlap* if the intersection of their sets of
memory locations is non-empty.
A memory operation **must** not affect memory at a memory location not within
its set of memory locations.

Memory locations for buffers and images are explicitly allocated in
[VkDeviceMemory](../chapters/memory.html#VkDeviceMemory) objects
, and are implicitly allocated for SPIR-V variables in each shader
invocation
.

Variables with `Workgroup` storage class that are decorated with
`Aliased` and that point to a block-decorated type share a set of memory
locations.

The values stored in memory locations newly allocated by the API are
set to 0 if allocated with the
[VK_MEMORY_ALLOCATE_ZERO_INITIALIZE_BIT_EXT](../chapters/memory.html#VkMemoryAllocateFlagBitsKHR) flag, otherwise they are
**undefined**.
For SPIR-V variables, the values are determined according to the
[SPIR-V specification](../chapters/introduction.html#spirv-spec).

At the time an allocation is created there have been no
[memory operations](#memory-model-memory-operation) to any of its memory
locations.
Using an initializer for a SPIR-V variable is not considered to be a memory
operation.

|  | For tessellation control shader output variables, a consequence of
| --- | --- |
initialization not being considered a memory operation is that some
implementations may need to insert a barrier between the initialization of
the output variables and any reads of those variables. |

For an operation A and memory location M:

* 
 A *reads* M if and only if the data stored
in M is an input to A.

* 
 A *writes* M if and only if the data
output from A is stored to M.

* 
 A *accesses* M if and only if it either
reads or writes (or both) M.

|  | A write whose value is the same as what was already in those memory
| --- | --- |
locations is still considered to be a write and has all the same effects. |

A *reference* is an object that a particular agent **can** use to access a set
of memory locations.
On the host, a reference is a host virtual address.
On the device, a reference is:

* 
The descriptor that a variable is bound to, for variables in Image,
Uniform, or StorageBuffer storage classes.
If the variable is an array (or array of arrays, etc.) then each element
of the array **may** be a unique reference.

* 
The address range for a buffer
in `PhysicalStorageBuffer` storage class,
  where the base of the address range is queried with
    [vkGetBufferDeviceAddress](../chapters/resources.html#vkGetBufferDeviceAddress)
    and the length of the range is the size of the buffer.

* 
A single common reference for all variables with `Workgroup` storage
class that are decorated with `Aliased` and that point to a
block-decorated type.

* 
The variable itself for all other variables in the `Workgroup`
storage class.

* 
A single common reference for all variables with `Workgroup` storage
class that point to a block-decorated type.

* 
The variable itself for non-block-decorated type variables in
`Workgroup` storage class.

* 
The variable itself for variables in other storage classes.

Two memory accesses through distinct references **may** require availability
and visibility operations as defined
[below](#memory-model-location-ordered).

A *dynamic instance* of an instruction is defined in SPIR-V
([https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#DynamicInstance](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#DynamicInstance))
as a way of referring to a particular execution of a static instruction.
Program-order is an ordering on dynamic instances of instructions executed
by a single shader invocation:

* 
(Basic block): If instructions A and B are in the same basic block, and
A is listed in the module before B, then the n’th dynamic instance of A
is program-ordered before the n’th dynamic instance of B.

* 
(Branch): The dynamic instance of a branch or switch instruction is
program-ordered before the dynamic instance of the OpLabel instruction
to which it transfers control.

* 
(Call entry): The dynamic instance of an `OpFunctionCall` instruction
is program-ordered before the dynamic instances of the
`OpFunctionParameter` instructions and the body of the called
function.

* 
(Call exit): The dynamic instance of the instruction following an
`OpFunctionCall` instruction is program-ordered after the dynamic
instance of the return instruction executed by the called function.

* 
(Transitive Closure): If dynamic instance A of any instruction is
program-ordered before dynamic instance B of any instruction and B is
program-ordered before dynamic instance C of any instruction then A is
program-ordered before C.

* 
(Complete definition): No other dynamic instances are program-ordered.

For instructions executed on the host, the source language defines the
program-order relation (e.g. as “sequenced-before”).

Shader-call-related is an equivalence relation on invocations defined as the
symmetric and transitive closure of:

* 
A is shader-call-related to B if A is created by an
[shader call](../chapters/raytracing.html#ray-tracing-shader-call) instruction executed by B.

Shader-call-order is a partial order on dynamic instances of instructions
executed by invocations that are shader-call-related:

* 
(Program order): If dynamic instance A is program-ordered before B, then
A is shader-call-ordered before B.

* 
(Shader call entry): If A is a dynamic instance of an
[shader call](../chapters/raytracing.html#ray-tracing-shader-call) instruction and B is a dynamic
instance executed by an invocation that is created by A, then A is
shader-call-ordered before B.

* 
(Shader call exit): If A is a dynamic instance of an
[shader call](../chapters/raytracing.html#ray-tracing-shader-call) instruction, B is the next
dynamic instance executed by the same invocation, and C is a dynamic
instance executed by an invocation that is created by A, then C is
shader-call-ordered before B.

* 
(Transitive closure): If A is shader-call-ordered-before B and B is
shader-call-ordered-before C, then A is shader-call-ordered-before C.

* 
(Complete definition): No other dynamic instances are
shader-call-ordered.

Atomic and barrier instructions include scopes which identify sets of shader
invocations that **must** obey the requested ordering and atomicity rules of
the operation, as defined below.

The various scopes are described in detail in [the Shaders chapter](../chapters/shaders.html#shaders-scope).

An *atomic operation* on the device is any SPIR-V operation whose name
begins with `OpAtomic`.
An atomic operation on the host is any operation performed with an
std::atomic typed object.

Each atomic operation has a memory [scope](#memory-model-scope) and a
[semantics](#memory-model-memory-semantics).
Informally, the scope determines which other agents it is atomic with
respect to, and the [semantics](#memory-model-memory-semantics) constrains
its ordering against other memory accesses.

Device atomic operations have explicit scopes and semantics.
Each host atomic operation implicitly uses the `CrossDevice` scope, and
uses a memory semantics equivalent to a C++ std::memory_order value of
relaxed, acquire, release, acq_rel, or seq_cst.

Two atomic operations A and B are *potentially-mutually-ordered* if and only
if all of the following are true:

* 
They access the same set of memory locations.

* 
They use the same reference.

* 
A is in the instance of B’s memory scope.

* 
B is in the instance of A’s memory scope.

* 
A and B are not the same operation (irreflexive).

Two atomic operations A and B are *mutually-ordered* if and only if they are
potentially-mutually-ordered and any of the following are true:

* 
A and B are both device operations.

* 
A and B are both host operations.

|  | If two atomic operations are not mutually-ordered, and if their sets of
| --- | --- |
memory locations overlap, then each **must** be synchronized against the other
as if they were non-atomic operations. |

For a given atomic write A, all atomic writes that are mutually-ordered with
A occur in an order known as A’s *scoped modification order*.
A’s scoped modification order relates no other operations.

|  | Invocations outside the instance of A’s memory scope **may** observe the values
| --- | --- |
at A’s set of memory locations becoming visible to it in an order that
disagrees with the scoped modification order. |

|  | It is valid to have non-atomic operations or atomics in a different scope
| --- | --- |
instance to the same set of memory locations, as long as they are
synchronized against each other as if they were non-atomic (if they are not,
it is treated as a [data race](#memory-model-access-data-race)).
That means this definition of A’s scoped modification order could include
atomic operations that occur much later, after intervening non-atomics.
That is a bit non-intuitive, but it helps to keep this definition simple and
non-circular. |

Non-atomic memory operations, by default, **may** be observed by one agent in a
different order than they were written by another agent.

Atomics and some synchronization operations include *memory semantics*,
which are flags that constrain the order in which other memory accesses
(including non-atomic memory accesses and
[availability and visibility operations](#memory-model-availability-visibility)) performed by the same agent **can** be observed by other agents,
or **can** observe accesses by other agents.

Host instructions that include semantics are some std::atomic methods and
memory fences.
Device instructions that include semantics are `OpAtomic*`,
`OpControlBarrier`, `OpMemoryBarrier`, and `OpMemoryNamedBarrier`.

Vulkan supports the following memory semantics:

* 
Relaxed: No constraints on order of other memory accesses.

* 
Acquire: A memory read with this semantic performs an *acquire
operation*.
A memory barrier with this semantic is an *acquire barrier*.

* 
Release: A memory write with this semantic performs a *release
operation*.
A memory barrier with this semantic is a *release barrier*.

* 
AcquireRelease: A memory read-modify-write operation with this semantic
performs both an acquire operation and a release operation, and inherits
the limitations on ordering from both of those operations.
A memory barrier with this semantic is both a release and acquire
barrier.

SequentiallyConsistent memory semantics is not supported and **must** not be
used.

|  | SPIR-V does not support “consume” semantics on the device. |
| --- | --- |

The memory semantics operand **can** also include *storage class semantics*
flags which indicate the storage classes constrained by the synchronization.
Vulkan supports the following SPIR-V storage class semantics flags:

* 
UniformMemory

* 
WorkgroupMemory

* 
ImageMemory

* 
OutputMemory

The remaining storage class semantics flags (SubgroupMemory,
CrossWorkgroupMemory, and AtomicCounterMemory) are ignored.

Each SPIR-V memory operation accesses a single storage class.
Semantics in synchronization operations can include a combination of storage
classes.

The UniformMemory storage class semantic applies to accesses to memory in
the
PhysicalStorageBuffer,
`ShaderRecordBufferKHR`,
Uniform and StorageBuffer storage classes.
The WorkgroupMemory storage class semantic applies to accesses to memory in
the Workgroup storage class.
The ImageMemory storage class semantic applies to accesses to memory in the
Image storage class.
The OutputMemory storage class semantic applies to accesses to memory in the
Output storage class.

|  | Informally, these constraints limit how memory operations can be reordered,
| --- | --- |
and these limits apply not only to the order of accesses as performed in the
agent that executes the instruction, but also to the order the effects of
writes become visible to all other agents within the same instance of the
instruction’s memory scope. |

|  | Release and acquire operations in different threads **can** act as
| --- | --- |
synchronization operations, to guarantee that writes that happened before
the release are visible after the acquire.
(This is not a formal definition, just an Informative forward reference.) |

|  | The OutputMemory storage class semantic is only useful in tessellation
| --- | --- |
control shaders, which is the only execution model where output variables
are shared between invocations. |

The memory semantics operand **can** also include availability and visibility
flags, which apply availability and visibility operations as described in
[availability and visibility](#memory-model-availability-visibility).
The availability/visibility flags are:

* 
MakeAvailable: Semantics **must** be Release or AcquireRelease.
Performs an availability operation before the release operation or
barrier.

* 
MakeVisible: Semantics **must** be Acquire or AcquireRelease.
Performs a visibility operation after the acquire operation or barrier.

The specifics of these operations are defined in
[Availability and Visibility Semantics](#memory-model-availability-visibility-semantics).

Host atomic operations **may** support a different list of memory semantics and
synchronization operations, depending on the host architecture and source
language.

After an atomic operation A performs a release operation on a set of memory
locations M, the *release sequence headed by A* is the longest continuous
subsequence of A’s scoped modification order that consists of:

* 
the atomic operation A as its first element

* 
atomic read-modify-write operations on M by any agent

|  | The atomics in the last bullet **must** be mutually-ordered with A by virtue of
| --- | --- |
being in A’s scoped modification order. |

|  | This intentionally omits “atomic writes to M performed by the same agent
| --- | --- |
that performed A”, which is present in the corresponding C++ definition. |

*Synchronizes-with* is a relation between operations, where each operation
is either an atomic operation or a memory barrier (aka fence on the host).

If A and B are atomic operations, then A synchronizes-with B if and only if
all of the following are true:

* 
A performs a release operation

* 
B performs an acquire operation

* 
A and B are mutually-ordered

* 
B reads a value written by A or by an operation in the release sequence
headed by A

`OpControlBarrier`, `OpMemoryBarrier`, and `OpMemoryNamedBarrier`
are *memory barrier* instructions in SPIR-V.

If A is a release barrier and B is an atomic operation that performs an
acquire operation, then A synchronizes-with B if and only if all of the
following are true:

* 
there exists an atomic write X (with any memory semantics)

* 
A is program-ordered before X

* 
X and B are mutually-ordered

* 
B reads a value written by X or by an operation in the release sequence
headed by X

If X is relaxed, it is still considered to head a hypothetical release
sequence for this rule

A and B are in the instance of each other’s memory scopes

X’s storage class is in A’s semantics.

If A is an atomic operation that performs a release operation and B is an
acquire barrier, then A synchronizes-with B if and only if all of the
following are true:

* 
there exists an atomic read X (with any memory semantics)

* 
X is program-ordered before B

* 
X and A are mutually-ordered

* 
X reads a value written by A or by an operation in the release sequence
headed by A

* 
A and B are in the instance of each other’s memory scopes

* 
X’s storage class is in B’s semantics.

If A is a release barrier and B is an acquire barrier, then A
synchronizes-with B if all of the following are true:

* 
there exists an atomic write X (with any memory semantics)

* 
A is program-ordered before X

* 
there exists an atomic read Y (with any memory semantics)

* 
Y is program-ordered before B

* 
X and Y are mutually-ordered

* 
Y reads the value written by X or by an operation in the release
sequence headed by X

If X is relaxed, it is still considered to head a hypothetical release
sequence for this rule

A and B are in the instance of each other’s memory scopes

X’s and Y’s storage class is in A’s and B’s semantics.

* 
NOTE: X and Y **must** have the same storage class, because they are
mutually ordered.

If A is a release barrier, B is an acquire barrier, and C is a control
barrier (where A **can** equal C, and B **can** equal C), then A synchronizes-with
B if all of the following are true:

* 
A is program-ordered before (or equals) C

* 
C is program-ordered before (or equals) B

* 
A and B are in the instance of each other’s memory scopes

* 
A and B are in the instance of C’s execution scope

|  | This is similar to the barrier-barrier synchronization above, but with a
| --- | --- |
control barrier filling the role of the relaxed atomics. |

Let F be an ordering of fragment shader invocations, such that invocation
F1 is ordered before invocation F2 if and only if F1 and F2 overlap
as described in [Fragment Shader Interlock](../chapters/shaders.html#shaders-scope-fragment-interlock) and F1 executes the interlocked code before F2.

If A is an `OpEndInvocationInterlockEXT` instruction and B is an
`OpBeginInvocationInterlockEXT` instruction, then A synchronizes-with B
if the agent that executes A is ordered before the agent that executes B in
F. A and B are both considered to have `FragmentInterlock` memory scope
and semantics of UniformMemory and ImageMemory, and A is considered to have
Release semantics and B is considered to have Acquire semantics.

|  | `OpBeginInvocationInterlockEXT` and `OpBeginInvocationInterlockEXT` do
| --- | --- |
not perform implicit availability or visibility operations.
Usually, shaders using fragment shader interlock will declare the relevant
resources as `coherent` to get implicit
[per-instruction availability and visibility operations](#memory-model-instruction-av-vis). |

If A is a release barrier and B is an acquire barrier, then A
synchronizes-with B if all of the following are true:

* 
A is shader-call-ordered-before B

* 
A and B are in the instance of each other’s memory scopes

No other release and acquire barriers synchronize-with each other.

*System-synchronizes-with* is a relation between arbitrary operations on the
device or host.
Certain operations system-synchronize-with each other, which informally
means the first operation occurs before the second and that the
synchronization is performed without using application-visible memory
accesses.

If there is an [execution dependency](../chapters/synchronization.html#synchronization-dependencies-execution) between two operations A and B, then the operation in the first
synchronization scope system-synchronizes-with the operation in the second
synchronization scope.

|  | This covers all Vulkan synchronization primitives, including device
| --- | --- |
operations executing before a synchronization primitive is signaled, wait
operations happening before subsequent device operations, signal operations
happening before host operations that wait on them, and host operations
happening before [vkQueueSubmit](../chapters/cmdbuffers.html#vkQueueSubmit).
The list is spread throughout the synchronization chapter, and is not
repeated here. |

System-synchronizes-with implicitly includes all storage class semantics and
has `CrossDevice` scope.

If A system-synchronizes-with B, we also say A is
*system-synchronized-before* B and B is *system-synchronized-after* A.

By default, non-atomic memory operations are treated as *private*, meaning
such a memory operation is not intended to be used for communication with
other agents.

*Non-private* memory operations are intended to be used for communication
with other agents.
Atomic operations are always considered *non-private*.

Memory operations with the `NonPrivatePointer`, `NonPrivateTexel`
, or `NonPrivateElementARM`
bit set are treated as *non-private*

More precisely, for private memory operations to be
[Location-Ordered](#memory-model-location-ordered) between distinct agents
requires using system-synchronizes-with rather than shader-based
synchronization.
Private memory operations still obey program-order.

Let SC be a non-empty set of storage class semantics.
Then (using template syntax) operation A *inter-thread-happens-before*
operation B if and only if any of the following is true:

* 
A system-synchronizes-with B

* 
A synchronizes-with B, and both A and B have all of SC in their
semantics

* 
A is an operation on memory in a storage class in SC or that has all of
SC in its semantics, B is a release barrier or release atomic with all
of SC in its semantics, and A is program-ordered before B

* 
A is an acquire barrier or acquire atomic with all of SC in its
semantics, B is an operation on memory in a storage class in SC or that
has all of SC in its semantics, and A is program-ordered before B

* 
A and B are both host operations and A inter-thread-happens-before B as
defined in the host language specification

* 
A inter-thread-happens-before some X and X
inter-thread-happens-before B

Operation A *happens-before* operation B if and only if any of the following
is true:

* 
A is program-ordered before B

* 
A inter-thread-happens-before B for some set of storage classes SC

*Happens-after* is defined similarly.

|  | Unlike C++, happens-before is not always sufficient for a write to be
| --- | --- |
visible to a read.
Additional [availability and visibility](#memory-model-availability-visibility) operations **may** be required for writes to be
[visible-to](#memory-model-visible-to) other memory accesses. |

|  | Happens-before is not transitive, but each of program-order and
| --- | --- |
inter-thread-happens-before are transitive.
These can be thought of as covering the “single-threaded” case and the
“multi-threaded” case, and it is not necessary (and not valid) to form
chains between the two. |

*Availability* and *visibility* are states of a write operation, which
(informally) track how far the write has permeated the system, i.e. which
agents and references are able to observe the write.
Availability state is per *memory domain*.
Visibility state is per (agent,reference) pair.
Availability and visibility states are per-memory location for each write.

Memory domains are named according to the agents whose memory accesses use
the domain.
Domains used by shader invocations are organized hierarchically into
multiple smaller memory domains which correspond to the different
[scopes](../chapters/shaders.html#shaders-scope).
Each memory domain is considered the *dual* of a scope, and vice versa.
The memory domains defined in Vulkan include:

* 
*host* - accessible by host agents

* 
*device* - accessible by all device agents for a particular device

* 
*shader* - accessible by shader agents for a particular device,
corresponding to the `Device` scope

* 
*queue family instance* - accessible by shader agents in a single queue
family, corresponding to the `QueueFamily` scope.

* 
*fragment interlock instance* - accessible by fragment shader agents
that [overlap](../chapters/shaders.html#shaders-scope-fragment-interlock), corresponding to the
`FragmentInterlock` scope.

* 
*shader call instance* - accessible by shader agents that are
[shader-call-related](#shader-call-related), corresponding to the
`ShaderCallKHR` scope.

* 
*workgroup instance* - accessible by shader agents in the same
workgroup, corresponding to the `Workgroup` scope.

* 
*subgroup instance* - accessible by shader agents in the same subgroup,
corresponding to the `Subgroup` scope.

The memory domains are nested in the order listed above,
except for shader call instance domain,
with memory domains later in the list nested in the domains earlier in the
list.
The shader call instance domain is at an implementation-dependent location
in the list, and is nested according to that location.
The shader call instance domain is not broader than the queue family
instance domain.

|  | Memory domains do not correspond to storage classes or device-local and
| --- | --- |
host-local [VkDeviceMemory](../chapters/memory.html#VkDeviceMemory) allocations, rather they indicate whether a
write can be made visible only to agents
in the same subgroup, same workgroup,
in overlapping fragment shader invocation,
in shader-call-related ray tracing invocation,
in any shader invocation, or
anywhere on the device, or host.
The shader, queue family instance,
fragment interlock instance,
shader call instance,
workgroup instance, and subgroup instance domains are only used for
shader-based availability/visibility operations, in other cases writes can
be made available from/visible to the shader via the device domain. |

*Availability operations*, *visibility operations*, and *memory domain
operations* alter the state of the write operations that happen-before them,
and which are included in their *source scope* to be available or visible to
their *destination scope*.

* 
For an availability operation, the source scope is a set of
(agent,reference,memory location) tuples, and the destination scope is a
set of memory domains.

* 
For a memory domain operation, the source scope is a memory domain and
the destination scope is a memory domain.

* 
For a visibility operation, the source scope is a set of memory domains
and the destination scope is a set of (agent,reference,memory location)
tuples.

How the scopes are determined depends on the specific operation.
Availability and memory domain operations expand the set of memory domains
to which the write is available.
Visibility operations expand the set of (agent,reference,memory location)
tuples to which the write is visible.

Recall that availability and visibility states are per-memory location, and
let W be a write operation to one or more locations performed by agent A via
reference R. Let L be one of the locations written.
(W,L) (the write W to L), is initially not available to any memory domain
and only visible to (A,R,L).
An availability operation AV that happens-after W and that includes (A,R,L)
in its source scope makes (W,L) *available* to the memory domains in its
destination scope.

A memory domain operation DOM that happens-after AV and for which (W,L) is
available in the source scope makes (W,L) available in the destination
memory domain.

A visibility operation VIS that happens-after AV (or DOM) and for which
(W,L) is available in any domain in the source scope makes (W,L) *visible*
to all (agent,reference,L) tuples included in its destination scope.

If write W2 happens-after W, and their sets of memory locations overlap,
then W will not be available/visible to all agents/references for those
memory locations that overlap (and future AV/DOM/VIS ops cannot revive W’s
write to those locations).

Availability, memory domain, and visibility operations are treated like
other non-atomic memory accesses for the purpose of
[memory semantics](#memory-model-memory-semantics), meaning they can be
ordered by release-acquire sequences or memory barriers.

An *availability chain* is a sequence of availability operations to
increasingly broad memory domains, where element N+1 of the chain is
performed in the dual scope instance of the destination memory domain of
element N and element N happens-before element N+1.
An example is an availability operation with destination scope of the
workgroup instance domain that happens-before an availability operation to
the shader domain performed by an invocation in the same workgroup.
An availability chain AVC that happens-after W and that includes (A,R,L) in
the source scope makes (W,L) *available* to the memory domains in its final
destination scope.
An availability chain with a single element is just the availability
operation.

Similarly, a *visibility chain* is a sequence of visibility operations from
increasingly narrow memory domains, where element N of the chain is
performed in the dual scope instance of the source memory domain of element
N+1 and element N happens-before element N+1.
An example is a visibility operation with source scope of the shader domain
that happens-before a visibility operation with source scope of the
workgroup instance domain performed by an invocation in the same workgroup.
A visibility chain VISC that happens-after AVC (or DOM) and for which (W,L)
is available in any domain in the source scope makes (W,L) *visible* to all
(agent,reference,L) tuples included in its final destination scope.
A visibility chain with a single element is just the visibility operation.

The following operations generate availability, visibility, and domain
operations.
When multiple availability/visibility/domain operations are described, they
are system-synchronized-with each other in the order listed.

An operation that performs a [memory dependency](../chapters/synchronization.html#synchronization-dependencies-memory) generates:

* 
If the source access mask includes [VK_ACCESS_HOST_WRITE_BIT](../chapters/synchronization.html#VkAccessFlagBits), then
the dependency includes a memory domain operation from host domain to
device domain.

* 
An availability operation with source scope of all writes in the first
[access scope](../chapters/synchronization.html#synchronization-dependencies-access-scopes) of the
dependency and a destination scope of the device domain.

* 
A visibility operation with source scope of the device domain and
destination scope of the second access scope of the dependency.

* 
If the destination access mask includes [VK_ACCESS_HOST_READ_BIT](../chapters/synchronization.html#VkAccessFlagBits) or
[VK_ACCESS_HOST_WRITE_BIT](../chapters/synchronization.html#VkAccessFlagBits), then the dependency includes a memory
domain operation from device domain to host domain.

[vkFlushMappedMemoryRanges](../chapters/memory.html#vkFlushMappedMemoryRanges) performs an availability operation, with a
source scope of (agents,references) = (all host threads, all mapped memory
ranges passed to the command), and destination scope of the host domain.

[vkInvalidateMappedMemoryRanges](../chapters/memory.html#vkInvalidateMappedMemoryRanges) performs a visibility operation, with a
source scope of the host domain and a destination scope of
(agents,references) = (all host threads, all mapped memory ranges passed to
the command).

[vkQueueSubmit](../chapters/cmdbuffers.html#vkQueueSubmit) performs a memory domain operation from host to device,
and a visibility operation with source scope of the device domain and
destination scope of all agents and references on the device.

A memory barrier or atomic operation via agent A that includes MakeAvailable
in its semantics performs an availability operation whose source scope
includes agent A and all references in the storage classes in that
instruction’s storage class semantics, and all memory locations, and whose
destination scope is a set of memory domains selected as specified below.
The implicit availability operation is program-ordered between the barrier
or atomic and all other operations program-ordered before the barrier or
atomic.

A memory barrier or atomic operation via agent A that includes MakeVisible
in its semantics performs a visibility operation whose source scope is a set
of memory domains selected as specified below, and whose destination scope
includes agent A and all references in the storage classes in that
instruction’s storage class semantics, and all memory locations.
The implicit visibility operation is program-ordered between the barrier or
atomic and all other operations program-ordered after the barrier or atomic.

The memory domains are selected based on the memory scope of the instruction
as follows:

* 
`Device` scope uses the shader domain

* 
`QueueFamily` scope uses the queue family instance domain

* 
`FragmentInterlock` scope uses the fragment interlock instance domain

* 
`ShaderCallKHR` scope uses the shader call instance domain

* 
`Workgroup` scope uses the workgroup instance domain

* 
`Subgroup` uses the subgroup instance domain

* 
`Invocation` perform no availability/visibility operations.

When an availability operation performed by an agent A includes a memory
domain D in its destination scope, where D corresponds to scope instance S,
it also includes the memory domains that correspond to each smaller scope
instance S' that is a subset of S and that includes A. Similarly for
visibility operations.

A memory write instruction that includes `MakePointerAvailable`, or an
image write instruction that includes `MakeTexelAvailable`,
or a tensor write instruction that includes `MakeElementAvailableARM`,
performs an availability operation whose source scope includes the agent and
reference used to perform the write and the memory locations written by the
instruction, and whose destination scope is a set of memory domains selected
by the Scope operand specified in
[Availability and Visibility Semantics](#memory-model-availability-visibility-semantics).
The implicit availability operation is program-ordered between the write and
all other operations program-ordered after the write.

A memory read instruction that includes `MakePointerVisible`, or an image
read instruction that includes `MakeTexelVisible`,
or a tensor read instruction that includes `MakeElementVisibleARM`
performs a visibility operation whose source scope is a set of memory
domains selected by the Scope operand as specified in
[Availability and Visibility Semantics](#memory-model-availability-visibility-semantics), and whose destination scope includes the agent and
reference used to perform the read and the memory locations read by the
instruction.
The implicit visibility operation is program-ordered between read and all
other operations program-ordered before the read.

|  | Although reads with per-instruction visibility only perform visibility ops
| --- | --- |
from the shader or
fragment interlock instance or
shader call instance or
workgroup instance or subgroup instance domain, they will also see writes
that were made visible via the device domain, i.e. those writes previously
performed by non-shader agents and made visible via API commands. |

|  | It is expected that all invocations in a subgroup execute on the same
| --- | --- |
processor with the same path to memory, and thus availability and visibility
operations with subgroup scope can be expected to be “free”. |

Let X and Y be memory accesses to overlapping sets of memory locations M,
where X != Y. Let (AX,RX) be the agent and reference used for X, and
(AY,RY) be the agent and reference used for Y. For now, let “→”
denote happens-before and “→rcpo” denote the reflexive closure of
program-ordered before.

If D1 and D2 are different memory domains, then let DOM(D1,D2) be a
memory domain operation from D1 to D2.
Otherwise, let DOM(D,D) be a placeholder such that X→DOM(D,D)→Y if and
only if X→Y.

X is *location-ordered* before Y for a location L in M if and only if any of
the following is true:

* 
AX == AY and RX == RY and X→Y

NOTE: this case means no availability/visibility ops are required when
it is the same (agent,reference).

X is a read, both X and Y are non-private, and X→Y

X is a read, and X (transitively) system-synchronizes with Y

If RX == RY and AX and AY access a common memory domain D (e.g.
are in the same workgroup instance if D is the workgroup instance
domain), and both X and Y are non-private:

* 
X is a write, Y is a write, AVC(AX,RX,D,L) is an availability chain
making (X,L) available to domain D, and X→rcpoAVC(AX,RX,D,L)→Y

* 
X is a write, Y is a read, AVC(AX,RX,D,L) is an availability chain
making (X,L) available to domain D, VISC(AY,RY,D,L) is a visibility
chain making writes to L available in domain D visible to Y, and
X→rcpoAVC(AX,RX,D,L)→VISC(AY,RY,D,L)→rcpoY

* 
If
[VkPhysicalDeviceVulkanMemoryModelFeatures](../chapters/features.html#VkPhysicalDeviceVulkanMemoryModelFeatures)::`vulkanMemoryModelAvailabilityVisibilityChains`
is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then AVC and VISC **must** each only have a single
element in the chain, in each sub-bullet above.

Let DX and DY each be either the device domain or the host domain,
depending on whether AX and AY execute on the device or host:

* 
X is a write and Y is a write, and
X→AV(AX,RX,DX,L)→DOM(DX,DY)→Y

* 
X is a write and Y is a read, and
X→AV(AX,RX,DX,L)→DOM(DX,DY)→VIS(AY,RY,DY,L)→Y

|  | The final bullet (synchronization through device/host domain) requires
| --- | --- |
API-level synchronization operations, since the device/host domains are not
accessible via shader instructions.
And “device domain” is not to be confused with “device scope”, which
synchronizes through the “shader domain”. |

Let X and Y be operations that access overlapping sets of memory locations
M, where X != Y, and at least one of X and Y is a write, and X and Y are not
mutually-ordered atomic operations.
If there does not exist a location-ordered relation between X and Y for each
location in M, then there is a *data race*.

Applications **must** ensure that no data races occur during the execution of
their application.

|  | Data races can only occur due to instructions that are actually executed.
| --- | --- |
For example, an instruction skipped due to control flow must not contribute
to a data race. |

Let X be a write and Y be a read whose sets of memory locations overlap, and
let M be the set of memory locations that overlap.
Let M2 be a non-empty subset of M. Then X is *visible-to* Y for memory
locations M2 if and only if all of the following are true:

* 
X is location-ordered before Y for each location L in M2.

* 
There does not exist another write Z to any location L in M2 such that
X is location-ordered before Z for location L and Z is location-ordered
before Y for location L.

If X is visible-to Y, then Y reads the value written by X for locations
M2.

|  | It is possible for there to be a write between X and Y that overwrites a
| --- | --- |
subset of the memory locations, but the remaining memory locations (M2)
will still be visible-to Y. |

*Reads-from* is a relation between operations, where the first operation is
a write, the second operation is a read, and the second operation reads the
value written by the first operation.
*From-reads* is a relation between operations, where the first operation is
a read, the second operation is a write, and the first operation reads a
value written earlier than the second operation in the second operation’s
scoped modification order or location order (or the first operation reads
from the initial value, and the second operation is any write to the same
locations).

Then the implementation **must** guarantee that no cycles exist in the union of
the following relations:

* 
location-ordered

* 
scoped modification order (over all atomic writes)

* 
reads-from

* 
from-reads

|  | This is a “consistency” axiom, which informally guarantees that sequences
| --- | --- |
of operations cannot violate causality. |

Let A and B be mutually-ordered atomic operations, where A is
location-ordered before B. Then the following rules are a consequence of
acyclicity:

* 
If A and B are both reads and A does not read the initial value, then
the write that A takes its value from **must** be earlier in its own scoped
modification order than (or the same as) the write that B takes its
value from (no cycles between location-order, reads-from, and
from-reads).

* 
If A is a read and B is a write and A does not read the initial value,
then A **must** take its value from a write earlier than B in B’s scoped
modification order (no cycles between location-order, scope modification
order, and reads-from).

* 
If A is a write and B is a read, then B **must** take its value from A or a
write later than A in A’s scoped modification order (no cycles between
location-order, scoped modification order, and from-reads).

* 
If A and B are both writes, then A **must** be earlier than B in A’s scoped
modification order (no cycles between location-order and scoped
modification order).

* 
If A is a write and B is a read-modify-write and B reads the value
written by A, then B comes immediately after A in A’s scoped
modification order (no cycles between scoped modification order and
from-reads).

If a shader invocation A in a shader stage other than `Vertex` performs a
memory read operation X from an object in storage class
`CallableDataKHR`, `IncomingCallableDataKHR`, `RayPayloadKHR`,
`HitAttributeKHR`, `IncomingRayPayloadKHR`, or
`Input`, then X is system-synchronized-after all writes to the
corresponding
`CallableDataKHR`, `IncomingCallableDataKHR`, `RayPayloadKHR`,
`HitAttributeKHR`, `IncomingRayPayloadKHR`, or
`Output` storage variable(s) in the shader invocation(s) that contribute
to generating invocation A, and those writes are all visible-to X.

|  | It is not necessary for the upstream shader invocations to have completed
| --- | --- |
execution, they only need to have generated the output that is being read. |

A call to [vkFreeMemory](../chapters/memory.html#vkFreeMemory) **must** happen-after all memory operations on all
memory locations in that [VkDeviceMemory](../chapters/memory.html#VkDeviceMemory) object.

|  | Normally, device memory operations in a given queue are synchronized with
| --- | --- |
[vkFreeMemory](../chapters/memory.html#vkFreeMemory) by having a host thread wait on a fence signaled by that
queue, and the wait happens-before the call to [vkFreeMemory](../chapters/memory.html#vkFreeMemory) on the
host. |

The deallocation of SPIR-V variables is managed by the system and
happens-after all operations on those variables.

This subsection offers more easily understandable consequences of the memory
model for app/compiler developers.

Let SC be the storage class(es) specified by a release or acquire operation
or barrier.

* 
An atomic write with release semantics must not be reordered against any
read or write to SC that is program-ordered before it (regardless of the
storage class the atomic is in).

* 
An atomic read with acquire semantics must not be reordered against any
read or write to SC that is program-ordered after it (regardless of the
storage class the atomic is in).

* 
Any write to SC program-ordered after a release barrier must not be
reordered against any read or write to SC program-ordered before that
barrier.

* 
Any read from SC program-ordered before an acquire barrier must not be
reordered against any read or write to SC program-ordered after the
barrier.

A control barrier (even if it has no memory semantics) must not be reordered
against any memory barriers.

This memory model allows memory accesses with and without availability and
visibility operations, as well as atomic operations, all to be performed on
the same memory location.
This is critical to allow it to reason about memory that is reused in
multiple ways, e.g. across the lifetime of different shader invocations or
draw calls.
While GLSL (and legacy SPIR-V) applies the “coherent” decoration to
variables (for historical reasons), this model treats each memory access
instruction as having optional implicit availability/visibility operations.
GLSL to SPIR-V compilers should map all (non-atomic) operations on a
coherent variable to Make{Pointer,Texel}{Available}{Visible} flags in this
model.

Atomic operations implicitly have availability/visibility operations, and
the scope of those operations is taken from the atomic operation’s scope.

For SPIR-V that uses the Vulkan Memory Model, the `OutputMemory` storage
class is used to synchronize accesses to tessellation control output
variables.
For legacy SPIR-V that does not enable the Vulkan Memory Model via
`OpMemoryModel`, tessellation outputs can be ordered using a control
barrier with no particular memory scope or semantics, as defined below.

Let X and Y be memory operations performed by shader invocations AX and
AY.
Operation X is *tessellation-output-ordered* before operation Y if and only
if all of the following are true:

* 
There is a dynamic instance of an `OpControlBarrier` instruction C
such that X is program-ordered before C in AX and C is program-ordered
before Y in AY.

* 
AX and AY are in the same instance of C’s execution scope.

If shader invocations AX and AY in the `TessellationControl`
execution model execute memory operations X and Y, respectively, on the
`Output` storage class, and X is tessellation-output-ordered before Y
with a scope of `Workgroup`, then X is location-ordered before Y, and if
X is a write and Y is a read then X is visible-to Y.

For each dynamic instance of a cooperative matrix load instruction
(`OpCooperativeMatrixLoadKHR`
, `OpCooperativeMatrixLoadNV`
, `OpCooperativeMatrixLoadTensorNV`
), some implementation-dependent invocation(s) within the instance of the
matrix’s scope perform a non-atomic load from each memory location that is
defined to be accessed by the instruction.

For each memory location accessed by a dynamic instance of a cooperative
matrix store instruction (`OpCooperativeMatrixStoreKHR`
, `OpCooperativeMatrixStoreNV`
, `OpCooperativeMatrixStoreTensorNV`
), a single implementation-dependent invocation within the instance of the
matrix’s scope performs a non-atomic store to that memory location.
